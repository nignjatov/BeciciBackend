var reviews = require("./models");

module.exports = (function () {
  return {
    getReviews: function (req, res, next) {
      return reviews.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },

    getApprovedReviewsByLanguage: function (req, res, next) {
      var lang = req.params.lang;
      return reviews.find({language: lang}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },

    updateReviewStatus: function (req, res, next) {
      var revId = req.params.reviewId;
      var status = req.params.status;
      return reviews.findOneAndModify({_id: userId}, {status: status}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },

    deleteReview: function (req, res, next) {
      var revId = req.params.reviewId;
      return reviews.findOneAndRemove({_id: revId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    createReview: function (req, res, next) {
      var review = new reviews(req.body);
      return review.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    }
  }
})();
