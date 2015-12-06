var services = require("./models");

module.exports = (function () {
  return {
    getFreeServices: function (req, res, next) {
      return services.find({serviceType: "freeService"}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    getRoomServices: function (req, res, next) {
      return services.find({serviceType: "roomService"}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    getFreeServicesByLanguage: function (req, res, next) {
      var language = req.params.lang;
      return services.find({serviceType: "freeService",language: language}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    getRoomServicesByLanguage: function (req, res, next) {
      return services.find({serviceType: "roomService",language: language}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    //TODO extend service with type
    createFreeService: function (req, res, next) {
      var service = new services(req.body);
      return service.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    },
    createRoomService: function (req, res, next) {
      var service = new services(req.body);
      return service.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    },
    updateHotelService: function (req, res, next) {
      var serviceId = req.params.id;
      return services.findOneAndModify({_id: serviceId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    deleteHotelService: function (req, res, next) {
      var serviceId = req.params.id;
      return services.findOneAndRemove({_id: serviceId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    }
  }
})();
