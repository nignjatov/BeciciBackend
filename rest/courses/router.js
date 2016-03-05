var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getCourseList", "GET", "/list/all", [], handler.getCourseList);
  router.register("updateCourseValue", "PATCH", "/:currency", ["admin"], handler.updateCourseValue);

  return router.getRoutes();
})();
