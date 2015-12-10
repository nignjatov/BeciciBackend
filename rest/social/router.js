var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getSocialNetworks", "GET", "/list", [], handler.getSocialNetworks);
  router.register("createSocialNetwork", "POST", "/list", ["admin"], handler.createSocialNetwork);
  router.register("updateSocialNetworkActivity", "PATCH", "/:socialId/:active", ["admin"], handler.updateSocialNetworkActivity);

  return router.getRoutes();
})();
