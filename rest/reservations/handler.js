var reservations = require("./models");

module.exports = (function () {
  return {
    getReservations: function (req, res, next) {
      return reservations.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    updateReservationStatus: function (req, res, next) {
      var reservationId = req.params.reservationId;
      var status = req.params.status;
      return reservations.findOneAndModify({_id: reservationId}, {status: status}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    deleteReservation: function (req, res, next) {
      var reservationId = req.params.reservationId;
      return reservations.findOneAndRemove({_id: reservationId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    createReservation: function (req, res, next) {
      var reservation = new reservations(req.body);
      return reservations.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    }
  }
})();
