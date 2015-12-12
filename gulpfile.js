var gulp = require('gulp');
var mocha = require('gulp-mocha');
var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var exec = require('child_process').exec;

gulp.task('test', function () {

    var child = exec('node ./server.js test');
    child.stdout.on('data', function(data) {
        if (data.trim() == 'Tests go!') {
            var tests = fs.readdirSync(path.join(__dirname, 'rest'));
            tests = _.chain(tests)
                .filter(function (dir) {
                    return fs.existsSync(path.join(__dirname, 'rest', dir, 'test', 'test.js'));
                })
                .map(function (dir) {
                    return path.join(__dirname, 'rest', dir, 'test', 'test.js');
                })
                .value();
            return gulp.src(tests, {read: false})
                .pipe(mocha({reporter: 'list'}))
                .on('end', function () {
                    process.exit(1);
                })
        }
    });
    child.on('close', function(code) {
       console.log("APP ERROR");
       process.exit(1);
    });

});