/**
 * Created by orahkokos on 12/12/15.
 */
var factory = require('./factory/generate.js');
var reviewModel = require('../models');
var async = require('async');

module.exports = function (callback) {
    // generate here
    var reviews = factory.generateReviews(100);
    async.each(reviews, function (review, callback) {
        review = new reviewModel(review);
        return review.save(callback);
    }, callback);
};