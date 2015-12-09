var gulp = require('gulp');
var mocha = require('gulp-mocha');
var fs = require('fs');
var path = require('path');

gulp.task('test', function () {
    return gulp.src(path.join(__dirname, 'rest', 'users', 'test', 'test.js'), {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});