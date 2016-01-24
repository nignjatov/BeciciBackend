var reservations = require("./models");
var request = require('request');

module.exports = (function () {
  return {
    getReservations: function (req, res, next) {
      return reservations.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next();
      });
    },
    updateReservationStatus: function (req, res, next) {
      var paymentId = req.body.paymentId;
      var action = req.body.action;
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

      // token for security
      var options = {
        url: 'http://194.106.182.81/test_app/checkout',
        method: 'POST',
        headers: {
          token: process.env.INTESA_TOKEN
        },
        form: req.body
      }
      return request(options, function (err, response, body) {
        if (err) return next(err);
        res.json(JSON.parse(body));
        return next();
      })
    }
  }
})();
