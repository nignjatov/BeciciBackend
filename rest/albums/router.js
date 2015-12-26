var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {

  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getAlbums", "GET", "/list", [], handler.getAlbums);
  router.register("createAlbum", "POST", "/", ["admin"], handler.createAlbum);
  router.register("deleteAlbum", "DELETE", "/:albumId", ["admin"], handler.deleteAlbum);
  router.register("renameAlbum", "PATCH", "/:albumId", ["admin"], handler.renameAlbum);
  router.register("addImage", "POST", "/:albumId/", ["admin"], handler.addImage,{
    storage: "albums",
    type: 'single',
    name: 'albumImage',
    options: null
  });
  router.register("deleteImage", "DELETE", "/:albumId/:image", ["admin"], handler.deleteImage);

  return router.getRoutes();

})();
