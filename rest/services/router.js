var express = require('express');
var handler = require('./handler.js');

module.exports = (function () {
  var router = express.Router();
  // TODO: APIDOC docs + swagger :)
  router.get("/service", handler.getServices);
  router.post("/service", handler.createService);
  router.delete("/:id", handler.deleteService);
  router.patch("/:id", handler.updateService);

  return router;
})();
