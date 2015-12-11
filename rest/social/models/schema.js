var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocialSchema = new Schema({
  network: {
    type: String,
    enum : ['facebook','twitter','youtube'],
    required: true,
  },
  link: {
    type: String
  },
  active: {
    type: Boolean,
    required: true
  }
});

module.exports = SocialSchema;
