var express = require('express');

var router = express.Router();

module.exports = (function () {

  router.get("/test", function (req, res, next) {
    console.log("POZDRAV IZ SISTEMA");
    req.errorStack = "UMRO";
    return next("SYSTEM_ERROR");
  });

  return router;

})()
