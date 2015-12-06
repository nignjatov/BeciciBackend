var express = require('express');
var handler = require('./handler.js');

module.exports = (function () {
  var router = express.Router();
  // TODO: APIDOC docs + swagger :)
  router.get("/freeServices", handler.getFreeServices);
  router.get("/roomServices", handler.getRoomServices);

  router.get("/freeServices/:lang", handler.getFreeServicesByLanguage);
  router.get("/roomServices/:lang", handler.getRoomServicesByLanguage);

  router.post("/roomService", handler.createFreeService);
  router.post("/freeService", handler.createRoomService);

  router.delete("/:id", handler.deleteHotelService);

  router.patch("/:id", handler.updateHotelService);

  return router;
})();
