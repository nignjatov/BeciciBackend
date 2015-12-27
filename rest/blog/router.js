var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {

  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getBlogs", "GET", "/list/:type/all", [], handler.getBlogs);
  router.register("createBlog", "POST", "/", ["admin"], handler.createBlog);
  router.register("deleteBlog", "DELETE", "/:blogId", ["admin"], handler.deleteBlog);
  router.register("updateBlog", "PATCH", "/:blogId", ["admin"], handler.updateBlog);
  router.register("addImage", "POST", "/:blogId/", ["admin"], handler.addBlogImage,{
    storage: "images",
    type: 'single',
    name: 'image',
    options: null
  });
  return router.getRoutes();

})();
