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
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  cors = require('cors');

// custom
var request = require("./libs/request");
var world = require("./world.js");
require('dotenv').config();


var app = express();
global.Container = {};
// Dev vs Prod
var env = (process.argv[2]) ? process.argv[2] : 'dev';
Container.config = require('./config/config.' + env + '.js');

// Load app
mongoose.connect(Container.config.mongodb.host + Container.config.mongodb.port + Container.config.mongodb.db, function (err) {
  if (err) throw err;

  world.init(function () {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(methodOverride());
    app.use(cookieParser('test'));

    app.use(request.in);
    app.use(session({
      secret: crypto.randomBytes(32).toString('hex'),
      name: 'becici',
      resave: false,
      saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(cors());

    return fs.readdir(path.join(__dirname, 'rest'), function (err, dirs) {
      if (err) throw err;
      if (!dirs || !dirs.length) throw "No modules";

      return async.each(dirs, function (dir, callback) {
        var exist = fs.existsSync(path.join(__dirname, 'rest', dir, 'init.js'));
        if (exist) {
          var restPoint = require(path.join(__dirname, 'rest', dir, 'init.js'));
          if (dir == 'auth') {
            restPoint(passport, function (err, router) {
              if (err) return callback("MODULE_ERROR", err);
              app.use("/api/" + dir, router);
              return callback();
            });
          } else {
            restPoint(function (err, router) {
              if (err) return callback("MODULE_ERROR", err);
              app.use("/api/" + dir, router);
              return callback();
            });
          }
        } else {
          return callback();
        }
      }, function (err) {
        if (err) throw "Module error"; // handle error

        app.use('/api/images', express.static(path.join(__dirname, 'storage')));

        // Exit middleware
        //app.use(request.out);
        app.use(request.error);



        // Iz angulara /api/images/avatars/<filename>

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
