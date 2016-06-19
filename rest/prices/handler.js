var prices = require("./models");

var path = require('path');

module.exports = (function () {
    return {
        getPriceImage: function (req, res, next) {
            return prices.find({}, function (err, list) {
                if (err) return next("MONGO_ERROR", err);
                res.json(list);
                return next(null, list);
            });
        },
        deleteIndividualRes: function (req, res, next) {
            return prices.remove({type : 'individualReservation'}, function (err) {
                if (err) return next("MONGO_ERROR", err);
                res.json(req.body);
                return next();
            });
        },
        deleteGroupRes: function (req, res, next) {
            return prices.remove({type : 'groupReservation'}, function (err) {
                if (err) return next("MONGO_ERROR", err);
                res.json(req.body);
                return next();
            });
        },

        uploadPriceImage: function (req, res, next) {
            var update = {filename: req.file.filename, type: 'priceList'};
            return prices.update({type: 'priceList'}, update, {upsert: true}, function (err) {
                console.log(err);
                if (err) return next("MONGO_ERROR", err);
                res.json(req.body);
                return next();
            });
        },
        uploadIndividual: function (req, res, next) {
            var update = {filename: req.file.filename, type: 'individualReservation'};
            return prices.update({type: 'individualReservation'}, update, {upsert: true}, function (err) {
                console.log(err);
                if (err) return next("MONGO_ERROR", err);
                res.json(req.body);
                return next();
            });
        },
        uploadGroup: function (req, res, next) {
            var update = {filename: req.file.filename, type: 'groupReservation'};
            return prices.update({type: 'groupReservation'}, update, {upsert: true}, function (err) {
                console.log(err);
                if (err) return next("MONGO_ERROR", err);
                res.json(req.body);
                return next();
            });
        }
    }
})();
