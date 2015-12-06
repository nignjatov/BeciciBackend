var express = require('express');
var handler = require('./handler.js');

module.exports = (function () {
  var router = express.Router();
  // TODO: APIDOC docs + swagger :)
  router.get("/", handler.getReviews);
  router.get("/approved/:lang", handler.getApprovedReviewsByLanguage);

  router.patch("/:reviewId/:status", handler.updateReviewStatus);

  router.post("/", handler.createReview);
  router.delete("/:reviewId", handler.deleteReview);

  return router;
})();
