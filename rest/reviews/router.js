var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getReviews", "GET", "/list/all", [], handler.getReviews);
  router.register("createReview", "POST", "/", ["user"], handler.createReview);
  router.register("updateReviewStatus", "PATCH", "/:reviewId/:status", ["admin"], handler.updateReviewStatus);
  router.register("deleteReview", "DELETE", "/:reviewId", ["admin"], handler.deleteReview);

  return router.getRoutes();
})();
