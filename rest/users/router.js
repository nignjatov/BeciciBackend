var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {

  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getUsers", "GET", "/list/all", ["admin"], handler.getUsers);
  router.register("createUser", "POST", "/", [], handler.createUser);
  router.register("updateUser", "PATCH", "/:userId", [], handler.updateUser);
  router.register("deleteUser", "DELETE", "/:userId", ["admin"], handler.deleteUser);
  router.register("getUser", "GET", "/:userId", [], handler.getUser);
  router.register("uploadAvatar", "PUT", "/:userId/avatar", [], handler.uploadAvatar, {
    storage: "avatars",
    type: 'single',
    name: 'avatar',
    options: null
  });

  return router.getRoutes();

})();
