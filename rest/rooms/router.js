var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getRooms", "GET", "/list/all", [], handler.getRooms);
  router.register("getRoomsAdmin", "GET", "/admin/list/all", ["admin"], handler.getRoomsAdmin);
  router.register("getRoomById", "GET", "/:roomId", [], handler.getRoomById);
  router.register("getRoomByIdAdmin", "GET", "/admin/:roomId", ["admin"], handler.getRoomByIdAdmin);
  router.register("createRoom", "POST", "/", ["admin"], handler.createRoom);
  router.register("updateRoom", "PATCH", "/:roomId", ["admin"], handler.updateRoom);
  router.register("deleteRoom", "DELETE", "/:roomId", ["admin"], handler.deleteRoom);
  router.register("addRoomImage", "POST", "/:roomId", ["admin"], handler.addRoomImage,{
    storage: "images",
    type: 'single',
    name: 'image',
    options: null
  });
  return router.getRoutes();
})();
