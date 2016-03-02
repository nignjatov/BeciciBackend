var courses = require("./models");

var path = require('path');

module.exports = (function () {
  return {
    getCourseList: function (req, res, next) {
      return courses.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
      });
    },
    updateCourseValue: function (req, res, next) {
      var currency = req.params.currency;
      delete req.body._id;
      return courses.update({currency: currency}, req.body,{upsert: true}, function (err) {
        console.log(err);
        if (err) return next("MONGO_ERROR", err);
        res.json(req.body);
        return next();
      });
    }
  }
})();
