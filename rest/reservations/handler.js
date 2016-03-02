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
        Container.models['reservations'].findOne({paymentId: paymentId}, function (err, reservation) {
          if (reservation && reservation.status == 'APPROVED') {
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
                  Container.models['reservations'].findOne({paymentId: paymentId}, function (err, reservation) {
                    if (err) return next('MONGO_ERROR');
                    if (!found) return next('RESERVATION_NOT_FOUND'); // zavesti
                    return Container.email.send('capture', 
                      {
                        reservation: JSON.stringify(reservation, null, 2), 
                        room: JSON.stringify(found, null, 2), 
                        termin: JSON.stringify(termin, null, 2)
                      }, 
                      req.body.email, 
                      function (err) {
                        if (err) return next(err);
                        res.sendStatus(200);
                        return next();    
                      }
                    );
                  })
                });
              });
            })    
          } else {
            return next('OPERATION_NOT_ALLOWED')
          }
        });
      } 
      if (action == 'reject') {
        // reject
        Container.models['reservations'].findOne({paymentId: paymentId}, function (err, reservation) {
          if (reservation && reservation.status == 'APPROVED') {
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
              Container.models['rooms'].findOne({'_id': req.body.order.room}, function (err, found) {
                if (err) return next('MONGO_ERROR');
                if (!found) return next('ROOM_NOT_FOUND');
                var termin = _.find(found.available, function (ter) {
                  if (ter._id == req.body.order.termin){
                    return true
                  }
                  return false;
                });
                return Container.email.send('reject', 
                    {
                      reservation: JSON.stringify(reservation, null, 2), 
                      room: JSON.stringify(found, null, 2), 
                      termin: JSON.stringify(termin, null, 2)
                    }, 
                    req.body.email, 
                    function (err) {
                      if (err) return next(err);
                      res.sendStatus(200);
                      return next();    
                    }
                  );
                });
            });
          } else {
            return next('OPERATION_NOT_ALLOWED')
          }
        });
      }

      if (action == 'cancel') {
        Container.models['reservations'].findOne({paymentId: paymentId}, function (err, reservation) {
          if (reservation && reservation.status == 'CAPTURED') {
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
              Container.models['rooms'].findOne({'_id': req.body.order.room}, function (err, found) {
                var termin = _.find(found.available, function (ter) {
                  if (ter._id == req.body.order.termin){
                    return true
                  }
                  return false;
                }); 
                termin.remained++;
                return found.save(function (err) {
                  if (err) return next('MONGO_ERROR');
                  
                    return Container.email.send('cancel', 
                      {
                        reservation: JSON.stringify(reservation, null, 2), 
                        room: JSON.stringify(found, null, 2), 
                        termin: JSON.stringify(termin, null, 2)
                      }, 
                      req.body.email, 
                      function (err) {
                        if (err) return next(err);
                        res.sendStatus(200);
                        return next();    
                      }
                    );
                });
              });
            });
          } else {
            return next('OPERATION_NOT_ALLOWED')
          }
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
        // Container.models['rooms'].findOne({'_id': req.body.order.room}, function (err, found) {
        //   if (err) return next('MONGO_ERROR');
        //   if (!found) return next('ROOM_NOT_FOUND');
        // });
        return next();
      })
    }
  }
})();
