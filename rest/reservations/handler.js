var Reservation = require("./models");
var request = require('request');
var moment = require('moment');
var crypto = require('crypto');
var _ = require('lodash');
var dateFormat = require('dateformat');

var ObjectId = require('mongoose').Types.ObjectId;

_calculatePrice = function (resInfo, room, termin, course) {
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
        getSingleReservation : function(req,res,next){
            var paymentId = req.params.paymentId;
            Container.models['reservations'].findOne({paymentId: paymentId}, function (err, reservation) {
                if (err) return next('MONGO_ERROR');
                if (!reservation) return next('RESERVATION_NOT_FOUND');
                res.json(reservation);
            });
        },
        reviewReservation: function (req, res, next) {
            var paymentId = req.params.paymentId;
            Container.models['reservations'].findOne({paymentId: paymentId}, function (err, reservation) {
                if (err) return next('MONGO_ERROR');
                if (!reservation) return next('RESERVATION_NOT_FOUND');
                reservationObj = reservation.toObject();
                Container.models['rooms'].findOne({'_id': reservationObj.order.room}, function (err, found) {
                    if (err) return next('MONGO_ERROR');
                    if (!found) return next('ROOM_NOT_FOUND');
                    var termin = _.find(found.available, function (ter) {
                        if (ter._id == reservationObj.order.termin) {
                            return true
                        }
                        return false;
                    });
                    termin.fromFormatted = dateFormat(termin.from, "dd/mm/yyyy");
                    termin.toFormatted = dateFormat(termin.to, "dd/mm/yyyy");
                    reservationObj.created_atFormatted = dateFormat(reservationObj.created_at, "dd/mm/yyyy h:MM:ss");
                    reservationObj.discountLink = "http://194.106.182.81/#/discount/"+reservationObj.paymentId;
                    if (reservationObj.notification && reservationObj.notification.result == 'APPROVED') {
                        console.log("OK");
                        console.log(reservationObj);
                        Container.email.send('paymentOk',
                            {
                                reservation: reservationObj,
                                room: found,
                                termin: termin,
                                date: dateFormat(new Date(), "dd/mm/yyyy"),
                            },
                            reservationObj.order.email,
                            function (err) {
                                if (err) {
                                    console.log("FAILED SENDING OK PAYMENT CONFIRMATION");
                                    console.log(err);
                                }
                            }
                        );
                    } else {
                        console.log("FAIL");
                        console.log(reservationObj);
                        Container.email.send('paymentFail',
                            {
                                reservation: reservationObj,
                                room: found,
                                termin: termin,
                                date: dateFormat(new Date(), "dd/mm/yyyy"),
                            },
                            reservationObj.order.email,
                            function (err) {
                                if (err) {
                                    console.log("FAILED SENDING FAIL PAYMENT CONFIRMATION");
                                    console.log(err);
                                }
                            }
                        );
                    }
                    if (reservationObj.status == 'APPROVED') {
                        if (termin.remained > 0) {
                            //accept reservation
                            termin.remained--;
                            reservationObj.status = "CAPTURED";
                            var appCode = crypto.randomBytes(32).toString('hex');
                            return Reservation.findOneAndUpdate({paymentId: reservationObj.paymentId}, {
                                status: "CAPTURED",
                                approvalCode: appCode
                            }, function (err) {
                                console.log(err);
                                if (err) return next('MONGO_ERROR');
                                return found.save(function (err) {
                                    console.log(err);
                                    if (err) return next('MONGO_ERROR');

                                    return Container.email.send('capture',
                                        {
                                            reservation: reservationObj,
                                            room: found,
                                            termin: termin,
                                            date: dateFormat(new Date(), "dd/mm/yyyy"),
                                            appCode: appCode
                                        },
                                        reservationObj.order.email,
                                        function (err) {
                                            if (err) return next(err);
                                            res.json(reservationObj);
                                            return next();
                                        }
                                    );
                                })
                            });
                        } else {
                            reservationObj.status = "VOIDED";
                            // reject reservation
                            return Reservation.findOneAndUpdate({paymentId: reservationObj.paymentId}, {status: "VOIDED"}, function (err) {
                                if (err) return next('MONGO_ERROR');
                                return Container.email.send('rejectBank',
                                    {
                                        reservation: reservationObj,
                                        room: found,
                                        termin: termin
                                    },
                                    "ignjatov90@hotmail.com",
                                    function (err) {
                                        if (err) return next(err);
                                        return Container.email.send('reject',
                                            {
                                                reservation: reservationObj,
                                                room: found,
                                                termin: termin
                                            },
                                            reservationObj.order.email,
                                            function (err) {
                                                if (err) return next(err);
                                                res.json(reservationObj);
                                                return next();
                                            }
                                        );
                                    });
                            });
                        }
                    } else {
                        res.json(reservationObj);
                        return next();
                    }
                });
            });
        },
        updateReservationStatus: function (req, res, next) {
            var paymentId = req.params.paymentId;
            var action = req.params.status;

            if (action == 'paid') {
                Container.models['reservations'].findOne({paymentId: paymentId}, function (err, reservation) {
                    if (reservation && reservation.status == 'CAPTURED') {
                        return Reservation.findOneAndUpdate({paymentId: paymentId}, {status: "PAID"}, function (err) {
                            if (err) return next('MONGO_ERROR');
                            res.json(reservation);
                            next();
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
                    if (reservation && reservation.status == 'PAID') {
                        console.log(reservation);
                        reservationObj = reservation.toObject();
                        Container.models['rooms'].findOne({'_id': reservationObj.order.room}, function (err, found) {
                            if (err) return next('MONGO_ERROR');
                            if (!found) return next('ROOM_NOT_FOUND');
                            var now = moment();
                            var termin = _.find(found.available, function (ter) {
                                if (ter._id == reservationObj.order.termin) {
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
                            console.log(Container.fees.feeRange);
                            var amt = (reservationObj.amount * (1 - fee)).toFixed(4);
                            console.log("Cancel date diff " + diff);
                            console.log("Returning amount " + amt);
                            var cancCode = crypto.randomBytes(32).toString('hex');
                            reservationObj.created_atFormatted = dateFormat(reservationObj.created_at, "dd/mm/yyyy h:MM:ss");
                            //Send emails and update termin and reservation
                            termin.remained++;
                            return Container.email.send('cancelOZone',
                                {
                                    reservation: reservationObj,
                                    room: found,
                                    termin: termin,
                                    amt: amt
                                },
                                "ignjatov90@hotmail.com, nemanjartrk@gmail.com",
                                function (err) {
                                    if (err) return next(err);
                                    return Container.email.send('cancel',
                                        {
                                            cancCode: cancCode
                                        },
                                        reservationObj.order.email,
                                        function (err) {
                                            if (err) return next(err);
                                            return found.save(function (err) {
                                                if (err) return next('MONGO_ERROR');
                                                return Reservation.findOneAndUpdate({paymentId: paymentId}, {status: "CANCELED"}, function (err) {
                                                    if (err) return next('MONGO_ERROR');
                                                    res.json(reservation);
                                                    next();
                                                });
                                            });
                                        });
                                });
                        });
                    }
                    else {
                        return next('OPERATION_NOT_ALLOWED')
                    }
                });
            }
        }
        ,
        deleteReservation: function (req, res, next) {
            var reservationId = req.params.reservationId;
            return Reservation.findOneAndRemove({_id: reservationId}, function (err) {
                if (err) return next("MONGO_ERROR", err);
                return next();
            });
        }
        ,
        createReservation: function (req, res, next) {
            // check room and calculate price
            Container.models['courses'].findOne({'currency': "EUR"}, function (err, course) {
                if (err) return next('MONGO_ERROR');
                if (!course) return next('COURSE_NOT_FOUND');
                course = course.toObject();
                Container.models['rooms'].findOne({'_id': req.body.order.room}, function (err, found) {
                    if (err) return next('MONGO_ERROR');
                    if (!found) return next('ROOM_NOT_FOUND');
                    if (!found.active) return next('ROOM_NOT_FOUND');
                    var termin = _.find(found.available, function (ter) {
                        if (ter._id == req.body.order.termin) {
                            return true
                        }
                        return false;
                    });
                    if (termin.remained > 0 && termin.active == true) {
                        req.body.amount = _calculatePrice(req.body, found, termin, course.value);
                        req.body.order.pricePerNight = termin.price["RSD"];
                        if (req.body.currency == "EUR") {
                            req.body.order.pricePerNight = termin.price["EUR"] * course.value;
                        }
                        req.body.order.childrenDiscount = found.child_discount;
                        req.body.order.bedDiscount = found.child_bed_discount;
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


        }
        ,
        saveRoomNumber: function (req, res, next) {
            var paymentId = req.params.paymentId;
            return Reservation.findOneAndUpdate({paymentId: paymentId}, req.body, function (err) {
                if (err) return next("MONGO_ERROR", err);
                res.json(req.body);
                return next();
            });
        },

        generateId: function (req, res, next) {
            var id = crypto.randomBytes(32).toString('hex').substring(0, 32);
            res.json(id);
            return next();
        }
    }
})
();
