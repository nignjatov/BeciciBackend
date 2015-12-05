var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var async = require('async');

module.exports = {
  init: function (callback) {
    // Remember this array
    Container.services = fs.readdirSync(path.join(__dirname, 'rest'));
    // Prepare errorCodes
    _.assign(Container.config.errorCodes, require(path.join(__dirname, 'config', 'errorCodes')));
    return async.each(Container.services, function (service, callback) {
      if (!fs.existsSync(path.join(__dirname, 'rest', service, 'config', 'errorCodes', 'index.js'))) {
        return callback();
      }
      _.assign(Container.config.errorCodes, require(path.join(__dirname, 'rest', service, 'config', 'errorCodes')))
      return callback();
    }, callback)
  }
}
