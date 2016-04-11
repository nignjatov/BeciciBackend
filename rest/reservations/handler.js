var Reservation = require("./models");
var request = require('request');
var moment = require('moment');
var _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

_calculatePrice = function (resInfo, room, termin, course) {
    console.log("CALC");
    console.log(resInfo);
    var end = new Date(termin.to);
    var start = new Date(termin.from)
    var daysNumber = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

    if (daysNumber > 0) {

        var price = {};

        var max_pers_no_share = room.bed_number + (room.big_bed ? 1 : 0);
        var adultsNumber = resInfo.order.adults;
        var childrenNumber = resInfo.order.children;

        if (adultsNumber == 1) {
            if (childrenNumber > 0) {
                childrenNumber--;
                adultsNumber++;
            }
        }

        var childrenBeds = max_pers_no_share - adultsNumber;
        var childrenSharing = 0;
        if (childrenNumber > childrenBeds) {
            childrenSharing = 2;
        }

        var personPriceRSD = daysNumber * termin.price["RSD"];
        var personPriceEUR = daysNumber * termin.price["EUR"];

        var priceRSD = personPriceRSD * adultsNumber;
        priceRSD += childrenSharing * personPriceRSD * ((room.child_bed_discount > 0) ? room.child_bed_discount / 100 : 1);
        priceRSD += (childrenNumber - childrenSharing) * personPriceRSD * ((room.child_discount > 0) ? room.child_discount / 100 : 1);

        var priceEUR = personPriceEUR * adultsNumber;
        priceEUR += childrenSharing * personPriceEUR * ((room.child_bed_discount > 0) ? room.child_bed_discount / 100 : 1);
        priceEUR += (childrenNumber - childrenSharing) * personPriceEUR * ((room.child_discount > 0) ? room.child_discount / 100 : 1);

        price.RSD = priceRSD;
        price.EUR = priceEUR;

        var retPrice = price.RSD;
        if (resInfo.currency == "EUR") {
            retPrice = price.EUR * course;
        }
        return retPrice;
    } else {
        return 0;
    }
}

module.exports = (function () {
    return {
        getReservations: function (req, res, next) {
            return Reservation.find({}, function (err, list) {
                if (err) return next("MONGO_ERROR", err);
                res.json(list);
                return next();
            });
        },
        reviewReservation: function (req, res, next) {
            var paymentId = req.params.paymentId;
            Container.models['reservations'].findOne({paymentId: paymentId}, function (err, reservation) {
                if (err) return next('MONGO_ERROR');
                if (!reservation) return next('RESERVATION_NOT_FOUND');
                reservation = reservation.toObject();
                console.log(reservation.status);
                if (reservation.status == 'APPROVED') {
                    Container.models['rooms'].findOne({'_id': reservation.order.room}, function (err, found) {
                        if (err) return next('MONGO_ERROR');
                        if (!found) return next('ROOM_NOT_FOUND');
                        var termin = _.find(found.available, function (ter) {
                            if (ter._id == reservation.order.termin) {
                                return true
                            }
                            return false;
                        });
                        if (termin.remained > 0) {
                            //accept reservation
                            termin.remained--;
                            return found.save(function (err) {
                                if (err) return next('MONGO_ERROR');
                                return Container.email.send('capture',
                                    {
                                        reservation: JSON.stringify(reservation, null, 2),
                                        room: JSON.stringify(found, null, 2),
                                        termin: JSON.stringify(termin, null, 2)
                                    },
                                    req.body.email,
                                    function (err) {
                                        if (err) return next(err);
                                        res.json(reservation);
                                        return next();
                                    }
                                );
                            })
                        } else {
                            // reject reservation

                            return Container.email.send('reject',
                                {
                                    reservation: JSON.stringify(reservation, null, 2),
                                    room: JSON.stringify(found, null, 2),
                                    termin: JSON.stringify(termin, null, 2)
                                },
                                req.body.email,
                                function (err) {
                                    if (err) return next(err);
                                    res.json(reservation);
                                    return next();
                                }
                            );

                        }
                    });
                }

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
                                if (ter._id == req.body.order.termin) {
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
                                if (err || response.statusCode != 200) return next(body);
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
                            if (err || response.statusCode != 200) return next(body);
                            Container.models['rooms'].findOne({'_id': req.body.order.room}, function (err, found) {
                                if (err) return next('MONGO_ERROR');
                                if (!found) return next('ROOM_NOT_FOUND');
                                var termin = _.find(found.available, function (ter) {
                                    if (ter._id == req.body.order.termin) {
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
                    if (err) return next('MONGO_ERROR');
                    if (!reservation) return next('RESERVATION_NOT_FOUND');
                    if (reservation && reservation.status == 'CAPTURED') {
                        Container.models['rooms'].findOne({'_id': req.body.order.room}, function (err, found) {
                            if (err) return next('MONGO_ERROR');
                            if (!found) return next('ROOM_NOT_FOUND');
                            var now = moment();
                            var termin = _.find(found.available, function (ter) {
                                if (ter._id == req.body.order.termin) {
                                    return true
                                }
                                return false;
                            });
                            var then = moment(termin.from);
                            var diff = parseInt(then.diff(now, Container.fees.dateType));
                            if (diff < 0) {
                                return next('RESERVATION_INVALID_DATE');
                            }
                            var fee = 0;
                            if (diff > Container.fees.feeRange.length - 1) {
                                fee = Container.fees.maxFee;
                            } else {
                                fee = Container.fees.feeRange[diff];
                            }
                            var amt = reservation.amount * (1 - fee);
                            var options = {
                                url: 'http://194.106.182.81/test_app/' + action,
                                method: 'POST',
                                headers: {
                                    token: process.env.INTESA_TOKEN
                                },
                                form: {
                                    paymentId: paymentId,
                                    amt: amt
                                }
                            }
                            return request(options, function (err, response, body) {
                                if (err || response.statusCode != 200) return next(body);
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
            // check room and calculate price
            Container.models['courses'].findOne({'currency': "EUR"}, function (err, course) {
                if (err) return next('MONGO_ERROR');
                if (!course) return next('COURSE_NOT_FOUND');
                course = course.toObject();
                Container.models['rooms'].findOne({'_id': req.body.order.room}, function (err, found) {
                    if (err) return next('MONGO_ERROR');
                    if (!found) return next('ROOM_NOT_FOUND');
                    var termin = _.find(found.available, function (ter) {
                        if (ter._id == req.body.order.termin) {
                            return true
                        }
                        return false;
                    });
                    if (termin.remained > 0) {
                        req.body.amount = _calculatePrice(req.body, found, termin, course.value);
                        console.log(req.body);
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
                    } else {
                        return next('NO_AVAILABLE_TERMIN');
                    }
                });
            });


        },
        saveRoomNumber: function (req, res, next) {
            var paymentId = req.params.paymentId;
            return Reservation.findOneAndUpdate({paymentId: paymentId}, req.body, function (err) {
                if (err) return next("MONGO_ERROR", err);
                res.json(req.body);
                return next();
            });
        }
    }
})();
