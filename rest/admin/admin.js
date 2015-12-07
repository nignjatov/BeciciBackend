var express = require('express');
    console.log("POZDRAV IZ SISTEMA");

var router = express.Router();

module.exports = (function () {

  router.get("/test", function (req, res, next) {
    req.errorStack = "UMRO";
    return next();
  });

  return router;


})()
