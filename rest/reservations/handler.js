var Reservation = require("./models");
var request = require('request');
var _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = (function () {
  return {
    getReservations: function (req, res, next) {
      return Reservation.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next();
      });
    },
    updateReservationStatus: function (req, res, next) {
      var paymentId = req.params.paymentId;
      var action = req.params.status;

      if (action == 'capture') {
        Container.models['rooms'].findOne({'_id': req.body.order.room}, function (err, found) {
          if (err) return next('MONGO_ERROR');
          if (!found) return next('ROOM_NOT_FOUND');
          var termin = _.find(found.available, function (ter) {
            if (ter._id == req.body.order.termin){
              return true
            }
            return false;
          });
          if (!termin.remained--) return next('ROOM_NOT_AVAILABLE');
          var options = {
            url: 'http://194.106.182.81/test_app/' + action,
            method: 'POST',
            headers: {
              token: process.env.INTESA_TOKEN
            },
            form: {
              paymentId: paymentId
            }
          }
          return request(options, function (err, response, body) {
            if (err) return next(err);
            return found.save(function (err) {
              if (err) return next('MONGO_ERROR');
              res.sendStatus(200);
              return next();
            });
          });
        })
      } else {
        // cancel
        var options = {
          url: 'http://194.106.182.81/test_app/' + action,
          method: 'POST',
          headers: {
            token: process.env.INTESA_TOKEN
          },
          form: {
            paymentId: paymentId
          }
        }
        return request(options, function (err, response, body) {
          if (err) return next(err);
          res.sendStatus(200);
          return next();
        });
      }
    },
    deleteReservation: function (req, res, next) {
      var reservationId = req.params.reservationId;
      return Reservation.findOneAndRemove({_id: reservationId}, function (err) {
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
