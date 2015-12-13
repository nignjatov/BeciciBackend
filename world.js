var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var logger = require('./libs/logger');
var async = require('async');
var constants = require('./config/constants.js');

module.exports = {
  init: function (callback) {
    // Load constants
    Container.path = constants;
    // Remember this array
    Container.services = fs.readdirSync(Container.path.REST_PATH);
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
