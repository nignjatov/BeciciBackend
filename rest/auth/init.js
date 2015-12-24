/**
 * Created by orahkokos on 12/14/15.
 */
var strategies = require('./strategies');
var router;
module.exports = function (passport, callback) {
  // Load strategies
  strategies(passport);

  router = require('./router')(passport);

  return callback(null, router);
};