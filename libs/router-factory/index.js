var path = require('path');
var express = require('express');
var validate = require('isvalid').validate;
var _ = require('lodash');
var multer = require('multer');

var upload = require('../multipart');

module.exports = function (dirName) {
  // Constructor
  function RouteFactory(dirName) {
    this.validationSchema = require(path.join(dirName, 'config', 'validation.js'));
    this.router = express.Router();
    this.bulkMiddleware = [];
  }

  // Main route factory
  RouteFactory.prototype.register = function (name, methodName, route, permission, callback, multipart) {
    this.setMultipart(multipart);
    this.getAuthorizationMiddleware(name, permission);
    this.getValidationMiddleware(name);
    this.makeRoute(methodName, route, callback);
    this.cleanup();
    return null;
  };
  // TODO: Implement after passport
  RouteFactory.prototype.getAuthorizationMiddleware = function (name, permission) {
    if (Container.config.app.auth) {

    }
    return null;
  };
  // Create validation middleware based on validation file
  RouteFactory.prototype.getValidationMiddleware = function (name) {
    if (!Container.config.app.validation) {
      return null;
    }
    var validationRoutes = [];
    
    if (this.validationSchema[name]) {
      if (this.validationSchema[name].schema.params) {
        validationRoutes.push(validate.param(this.validationSchema[name].schema.params));
      }
      if (this.validationSchema[name].schema.query) {
        validationRoutes.push(validate.query(this.validationSchema[name].schema.query));
      }
      if (this.validationSchema[name].schema.body) {
        validationRoutes.push(validate.body(this.validationSchema[name].schema.body));
      }
    }

    return this.bulkMiddleware.push(validationRoutes);
  };
  RouteFactory.prototype.setMultipart = function (multipart) {
    if (!multipart) {
      return null;
    }
    return this.bulkMiddleware.push(upload(multipart));
  };
  // Register new route with all middleware + handler (callback)
  RouteFactory.prototype.makeRoute = function (methodName, route, callback) {
    this.bulkMiddleware.push(collectInput);
    this.bulkMiddleware.push(callback);
    return this.router[methodName.toLowerCase()](route, this.bulkMiddleware);

    function collectInput(req, res, next) {
      req.inputData = {};
      _.assign(req.inputData, req.params);
      _.assign(req.inputData, req.query);
      _.assign(req.inputData, req.body);
      return next();
    }
  };
  // Resereved for post-register cleanup
  RouteFactory.prototype.cleanup = function () {
    return this.bulkMiddleware = [];
  };
  // Return at end of route file to get full service router
  RouteFactory.prototype.getRoutes = function () {
    return this.router;
  };
  return new RouteFactory(dirName)
};
