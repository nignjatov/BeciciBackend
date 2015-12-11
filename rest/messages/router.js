var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getMessages", "GET", "/list", [], handler.getMessages);
  router.register("createMessage", "POST", "/list", ["user"], handler.createMessage);
  router.register("updateMessageStatus", "PATCH", "/:messageId/:status", ["admin"], handler.updateMessageStatus);
  router.register("deleteMessage", "DELETE", "/:messageId", ["admin"], handler.deleteMessage);

  return router.getRoutes();
})();
