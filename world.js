var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var logger = require('./libs/logger');
var async = require('async');
var constants = require('./config/constants.js');

module.exports = {
  init: function (callback) {
    if (!process.env.INTESA_TOKEN) {
     throw "Set security token for Intesa payment gateway";
    }
    //if (!process.env.EMAIL_PASSWORD) {
    //  throw "Please setup EMAIL_PASSWORD in process env ( see email config )"
    //}
    //if (!process.env.EMAIL_USER) {
    //  throw "Please setup EMAIL_USER in process env ( see email config )"
    //}
    // Load constants
    Container.path = constants;

    // Remember this array
    Container.services = fs.readdirSync(Container.path.REST_PATH);

    // Make logger available everywhere
    Container.Logger = logger;

    // Prepare errorCodes
    _.assign(Container.config.errorCodes, require(path.join(__dirname, 'config', 'errorCodes')));

    // Load models
    Container.models = {};

    // Load email client
    Container.email = require(path.join(Container.path.LIBS_PATH, 'email'));
    Container.email.init();

    return async.each(Container.services, function (service, callback) {
      if (fs.existsSync(path.join(__dirname, 'rest', service, 'config', 'errorCodes', 'index.js'))) {
        _.assign(Container.config.errorCodes, require(path.join(__dirname, 'rest', service, 'config', 'errorCodes')));
      }
      if (fs.existsSync(path.join(__dirname, 'rest', service, 'models', 'index.js'))) {
        Container.models[service] = require(path.join(__dirname, 'rest', service, 'models', 'index.js'));
      }
      return callback();
    }, callback)
  }
}
