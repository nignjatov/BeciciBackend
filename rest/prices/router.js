var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getPriceImage", "GET", "/list/all", [], handler.getPriceImage);
  router.register("uploadPriceImage", "POST", "/image", ["admin"], handler.uploadPriceImage,{
    storage: "images",
    type: 'single',
    name: 'image',
    options: null
  });

  return router.getRoutes();
})();
