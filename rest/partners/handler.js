var partners = require("./models");
var async = require('async');
var path = require('path');
var email = require(path.join(Container.path.LIBS_PATH, 'email'));

module.exports = (function () {
  return {
    getAllPartners: function (req, res, next) {
      return partners.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
      });
    },
    updatePartnerInfo: function (req, res, next) {
      var partnerId = req.params.partnerId;
      delete req.body._id;
      return partners.findOneAndUpdate({_id: partnerId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json(req.body);
        return next();
      });
    },
    createPartner: function (req, res, next) {
      var partner = new partners(req.body);
      return partner.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        res.json(partner);
        return next();
      });
    },
    deletePartner: function (req, res, next) {
      console.log(req.params.partnerId)
      var partnerId = req.params.partnerId;
      return partners.findOneAndRemove({_id: partnerId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: partnerId});
        return next();
      });
    },
  }
})();
