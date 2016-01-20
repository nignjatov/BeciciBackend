var services = require("./models");

module.exports = (function () {
  return {
    getServices: function (req, res, next) {
      var filter = {};
      if (req.params.type) {
        filter.serviceType = req.params.type;
      }
      return services.find(filter, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
      });
    },
    createService: function (req, res, next) {
      var service = new services(req.body);
      return service.save(function (err) {
        console.log(err);
        if (err) return next("MONGO_ERORR", err);
        res.json(service);
        return next();
      });
    },
    updateService: function (req, res, next) {
      var serviceId = req.params.serviceId;
      if (req.body.serviceType == 'roomService') {
        var update = {
          title: req.body.title
        }
      } else {
        var update = {
          title: req.body.title,
          description: req.body.description,
          last_modified : req.body.last_modified
        }
      }
      return services.findOneAndUpdate({_id: serviceId}, update, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: serviceId});
        return next();
      });
    },
    deleteService: function (req, res, next) {
      var serviceId = req.params.serviceId;
      return services.findOneAndRemove({_id: serviceId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: serviceId});
        return next();
      });
    },
    addServiceImage: function (req, res, next) {
      var serviceId = req.params.serviceId;
      var update    = {image: req.file.filename};
      //TODO remove old image
      return services.findOneAndUpdate({_id: serviceId}, update,
        function (err) {
          if (err) return next("MONGO_ERROR", err);
          res.json({
            _id: serviceId,
            filename: req.file.filename
          });
          return next();
        });
    }
  }
})();
