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
        deleteManagementDocument: function (req, res, next) {
            var type = req.params.documentType;
            return prices.remove({type : type}, function (err) {
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
        uploadManagementDocument: function (req, res, next) {
            var type = req.params.documentType;
            var update = {filename: req.file.filename, type:type};
            return prices.update({type: type}, update, {upsert: true}, function (err) {
                console.log(err);
                if (err) return next("MONGO_ERROR", err);
                res.json(req.body);
                return next();
            });
        }
    }
})();
