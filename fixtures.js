/**
 * Created by orahkokos on 12/12/15.
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var config = require('./config/config.test.js');


mongoose.connect(config.mongodb.host + config.mongodb.port + config.mongodb.db, function (err) {
    if (err) throw err;
    mongoose.connection.db.dropDatabase();

    var fixtures = fs.readdirSync(path.join(__dirname, 'rest'));
    fixtures = _.chain(fixtures)
        .filter(function (dir) {
            return fs.existsSync(path.join(__dirname, 'rest', dir, 'test', 'fixtures.js'));
        })
        .map(function (dir) {
            return path.join(__dirname, 'rest', dir, 'test', 'fixtures.js');
        })
        .value();

    async.eachSeries(fixtures, function (fix, callback) {
        return require(fix)(callback);
    }, function (err) {
        if (err) throw err;
        console.log("All fixtures have been added");
        process.exit(1);
    });

});




