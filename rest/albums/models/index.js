var mongoose = require('mongoose');
var schema = require('./schema.js');

// methods
// Ovo je method na instanci

// statics
// Ovo je method na modelu

var model = mongoose.model('album', schema);

module.exports = model;
