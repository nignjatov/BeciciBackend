// core
var
  fs = require('fs'),
  path = require('path'),
  crypto = require('crypto');


// npm
var
  express = require('express'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  async = require('async'),
  passport = require('passport');

// custom
var request = require("./libs/request");
var world = require("./world.js");

var app = express();
global.Container = {};
// Dev vs Prod
var env = (process.argv[2]) ? process.argv[2] : 'dev';
Container.config = require('./config/config.' + env + '.js');

// Load app
mongoose.connect(Container.config.mongodb.host + Container.config.mongodb.port + Container.config.mongodb.db, function (err) {
  if (err) throw err;

  world.init(function () {

    app.use(request.in);
    app.use(session({
      secret: crypto.randomBytes(32).toString('hex'),
      name: 'becici',
      resave: false,
      saveUninitialized: false
    }));

    app.use(express.static(path.join(__dirname, 'storage')));
    // TODO: Setup passport
    // app.use(passport.initialize());
    // app.use(passport.session());

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    return fs.readdir(path.join(__dirname, 'rest'), function (err, dirs) {
      if (err) throw err;
      if (!dirs || !dirs.length) throw "No modules";

      var adminRoute;

      return async.each(dirs, function (dir, callback) {
        if (!/\.js/.exec(dir)) {
          // error handle todo
          var exist = fs.existsSync(path.join(__dirname, 'rest', dir, 'init.js'));
          if (exist) {
            var restPoint = require(path.join(__dirname, 'rest', dir, 'init.js'));
            restPoint(function (err, router) {
              if (err) return callback("MODULE_ERROR", err);
              app.use("/" + dir, router);
              return callback();
            });
          } else {
            return callback();
          }
        } else {
          adminRoute = require(path.join(__dirname, 'rest', dir));
          app.use("/admin", adminRoute);
          return callback();
        }
      }, function (err) {
        if (err) throw "Module error"; // handle error

        // Exit middleware
        app.use(request.out);
        app.use(request.error);


        return app.listen(3000, function () {
          console.log("App listening on port 3000");
          // post-init.js
          if (env == 'test') {
              console.log("Tests go!");
          }
        });
      })
    })
  });
});
