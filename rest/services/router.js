var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {

  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getServices", "GET", "/list", [], handler.getServices);
  router.register("createService", "POST", "/service", ["admin"], handler.createService);
  router.register("deleteService", "DELETE", "/:id", ["admin"], handler.deleteService);
  router.register("updateService", "PATCH", "/:id", ["admin"], handler.updateService);

  return router.getRoutes();
})();
