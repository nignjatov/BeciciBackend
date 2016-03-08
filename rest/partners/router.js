var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getAllPartners", "GET", "/list/all", [], handler.getAllPartners);
  router.register("updatePartnerInfo", "PATCH", "/:partnerId", ["admin"], handler.updatePartnerInfo);
  router.register("createPartner", "POST", "/", ["admin"], handler.createPartner);
  router.register("deletePartner", "DELETE", "/:partnerId", ["admin"], handler.deletePartner);

  return router.getRoutes();
})();
