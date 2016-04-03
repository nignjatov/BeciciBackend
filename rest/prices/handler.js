var prices = require("./models");

var path = require('path');

module.exports = (function () {
  return {
    getPriceImage: function (req, res, next) {
      return prices.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
      });
    },
    uploadPriceImage: function (req, res, next) {
      var update = {filename: req.file.filename};
      return prices.update({}, update,{upsert: true}, function (err) {
        console.log(err);
        if (err) return next("MONGO_ERROR", err);
        res.json(req.body);
        return next();
      });
    }
  }
})();
