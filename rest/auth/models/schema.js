var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'user'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = AuthSchema;
