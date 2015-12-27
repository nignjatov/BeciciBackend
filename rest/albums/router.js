var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {

  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getAlbums", "GET", "/list/all", [], handler.getAlbums);
  router.register("getAlbumById", "GET", "/:albumId", [], handler.getAlbumById);
  router.register("createAlbum", "POST", "/", ["admin"], handler.createAlbum);
  router.register("deleteAlbum", "DELETE", "/:albumId", ["admin"], handler.deleteAlbum);
  router.register("renameAlbum", "PATCH", "/:albumId", ["admin"], handler.renameAlbum);
  router.register("addImage", "POST", "/:albumId/", ["admin"], handler.addImage,{
    storage: "images",
    type: 'single',
    name: 'image',
    options: null
  });
  router.register("deleteImage", "DELETE", "/:albumId/:image", ["admin"], handler.deleteImage);

  return router.getRoutes();

})();
