/**
 * Created by orahkokos on 12/12/15.
 */
var factory = require('./factory/generate.js');
var usersModel = require('../models');
var async = require('async');

module.exports = function (callback) {
    // generate here
    var users = factory.generateUsers(10);
    async.each(users, function (user, callback) {
        user = new usersModel(user);
        return user.save(callback);
    }, callback);
};