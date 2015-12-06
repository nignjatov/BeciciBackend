var router = require('./router.js');

module.exports = function (callback) {
  return callback(null, router);
};
