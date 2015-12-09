var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var logger = require('./libs/logger');
var async = require('async');

module.exports = {
  init: function (callback) {
    // Remember this array
    Container.services = fs.readdirSync(path.join(__dirname, 'rest'));
    // Make logger available everywhere
    Container.Logger = logger;
    // Prepare errorCodes
    _.assign(Container.config.errorCodes, require(path.join(__dirname, 'config', 'errorCodes')));
    return async.each(Container.services, function (service, callback) {
      if (fs.existsSync(path.join(__dirname, 'rest', service, 'config', 'errorCodes', 'index.js'))) {
        _.assign(Container.config.errorCodes, require(path.join(__dirname, 'rest', service, 'config', 'errorCodes')));
      }
      // if (fs.existsSync(path.join(__dirname, 'rest', service, 'config', 'validation.js'))) {
      //   _.assign(Container.config.validation, require(path.join(__dirname, 'rest', service, 'config', 'validation.js')));
      // }
      return callback();
    }, callback)
  }
}
