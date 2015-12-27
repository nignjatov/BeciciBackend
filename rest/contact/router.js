var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getContactInfo", "GET", "/list/all", [], handler.getContactInfo);
  router.register("createContactInfo", "POST", "/", ["admin"], handler.createContactInfo);
  router.register("updateContactInfo", "PATCH", "/:contactId", ["admin"], handler.updateContactInfo);

  return router.getRoutes();
})();
