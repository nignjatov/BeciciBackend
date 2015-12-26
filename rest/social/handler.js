var socials = require("./models");

module.exports = (function () {
  return {
    getSocialNetworks: function (req, res, next) {
      return socials.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        req.payload = list;
        return next(null, list);
      });
    },
    updateSocialNetwork: function (req, res, next) {
      var socialId = req.params.socialId;
      return socials.findOneAndUpdate({_id: socialId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    createSocialNetwork: function (req, res, next) {
      var social = new socials(req.body);
      return social.save(function (err) {
        console.log(err);
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    },
    deleteSocialNetwork: function (req, res, next) {
      var social = req.params.socialId;
      return socials.findOneAndRemove({_id: social}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    }
  }
})();
