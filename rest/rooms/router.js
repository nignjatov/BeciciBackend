var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getRooms", "GET", "/list", [], handler.getRooms);
  router.register("createRoom", "POST", "/list", ["admin"], handler.createRoom);
  //router.register("updateRoom", "PATCH", "/:roomId", ["admin"], handler.updateRoom);
  //router.register("deleteRoom", "DELETE", "/:roomId", ["admin"], handler.deleteRoom);

  return router.getRoutes();
})();
