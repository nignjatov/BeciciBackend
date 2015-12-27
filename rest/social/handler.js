var socials = require("./models");

module.exports = (function () {
  return {
    getSocialNetworks: function (req, res, next) {
      return socials.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
      });
    },
    updateSocialNetwork: function (req, res, next) {
      var socialId = req.params.socialId;
      return socials.findOneAndUpdate({_id: socialId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: socialId});
        return next();
      });
    },
    createSocialNetwork: function (req, res, next) {
      var social = new socials(req.body);
      return social.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        res.json(social);
        return next();
      });
    },
    deleteSocialNetwork: function (req, res, next) {
      var socialId = req.params.socialId;
      return socials.findOneAndRemove({_id: socialId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: socialId});
        return next();
      });
    }
  }
})();
