var reviews = require("./models");

module.exports = (function () {
  return {
    getReviews: function (req, res, next) {
      return reviews.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
      });
    },
    updateReviewStatus: function (req, res, next) {
      var reviewId = req.params.reviewId;
      var status = req.params.status;
      console.log("ID "+ reviewId);
      console.log("STATUS "+ status);
      return reviews.findOneAndUpdate({_id: reviewId}, {status: status}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: reviewId});
        return next();
      });
    },
    deleteReview: function (req, res, next) {
      var reviewId = req.params.reviewId;
      return reviews.findOneAndRemove({_id: reviewId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: reviewId});
        return next();
      });
    },
    createReview: function (req, res, next) {
      var review = new reviews(req.body);
      return review.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        res.json({_id: reviewId});
        return next();
      });
    }
  }
})();
