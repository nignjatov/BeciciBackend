var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getSocialNetworks", "GET", "/list", [], handler.getSocialNetworks);
  router.register("createSocialNetwork", "POST", "/", ["admin"], handler.createSocialNetwork);
  router.register("updateSocialNetwork", "PATCH", "/:socialId/", ["admin"], handler.updateSocialNetwork);
  router.register("deleteSocialNetwork", "DELETE", "/:socialId/", ["admin"], handler.deleteSocialNetwork);

  return router.getRoutes();
})();
