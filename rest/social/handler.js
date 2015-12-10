var socials = require("./models");

module.exports = (function () {
  return {
    getSocialNetworks: function (req, res, next) {
      return socials.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    updateSocialNetworkActivity: function (req, res, next) {
      var socialId = req.params.socialId;
      var isActive = req.params.active;
      return socials.findOneAndModify({_id: socialId}, {active: isActive}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    createSocialNetwork: function (req, res, next) {
      var social = new socials(req.body);
      return social.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    }
  }
})();
