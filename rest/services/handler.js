var services = require("./models");

module.exports = (function () {
  return {
    getServices: function (req, res, next) {
      var filter = {};
      if (req.input.type) {
        filter['serviceType'] = req.input.type;
      }
      return services.find(filter, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    createService: function (req, res, next) {
      var service = new services(req.input);
      return service.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    },
    updateService: function (req, res, next) {
      var serviceId = req.input.id;
      return services.findOneAndModify({_id: serviceId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    deleteService: function (req, res, next) {
      var serviceId = req.params.id;
      return services.findOneAndRemove({_id: serviceId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    }
  }
})();
