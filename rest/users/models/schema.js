var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  },
  username: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      pattern: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  },
  phone: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserSchema;
