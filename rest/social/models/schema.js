var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocialSchema = new Schema({
  network: {
    type: String,
    enum : ['Facebook','Twitter','Youtube'],
    required: true,
  },
  link: {
    type: String
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = SocialSchema;
