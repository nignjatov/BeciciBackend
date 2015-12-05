var express = require('express');
var handler = require('./handler.js');

module.exports = (function () {
  var router = express.Router();
  // TODO: APIDOC docs + swagger :)
  router.get("/:id", handler.getUser);
  router.get("/list", handler.getUsers);
  router.post("/", handler.createUser);
  router.patch("/:id", handler.updateUser);
  router.delete("/:id", handler.deleteUser);

  return router;
})();
