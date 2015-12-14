var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var schema = require('./schema.js');

// methods
schema.methods.cryptPassword = function () {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
};

// statics
schema.statics.validatePassword = function (hash) {
  return bcrypt.compareSync(this.password, hash);
};

var model = mongoose.model('auth', schema);

module.exports = model;
