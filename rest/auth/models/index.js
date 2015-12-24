var mongoose = require('mongoose');
var schema = require('./schema.js');

var model = mongoose.model('auth', schema);

module.exports = model;
