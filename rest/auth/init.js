/**
 * Created by orahkokos on 12/14/15.
 */
var router = require('./router');
var strategies = require('./strategies');

module.exports = function (passport, callback) {
  // Load strategies
  strategies(passport);

  return callback(null, router);
};