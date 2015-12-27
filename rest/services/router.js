var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {

  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getServices", "GET", "/list/:type/all", [], handler.getServices);
  router.register("createService", "POST", "/", ["admin"], handler.createService);
  router.register("deleteService", "DELETE", "/:serviceId", ["admin"], handler.deleteService);
  router.register("updateService", "PATCH", "/:serviceId", ["admin"], handler.updateService);

  return router.getRoutes();
})();
