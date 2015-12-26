/**
 * Created by orahkokos on 12/12/15.
 */
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = (function () {
    var factories = fs.readdirSync(__dirname);
    var result = {};
    _.chain(factories)
        .filter(function (dir) {
            return !/\.js/.exec(dir);
        })
        .forEach(function (dir) {
            result["generate" +firstToUpperCase(dir)] = require(path.join(__dirname, dir));
        })
        .value();
    return result;
})();

function firstToUpperCase( str ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}