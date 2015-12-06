var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ServiceSchema = new Schema({
  serviceType: {
    type: String,
    enum: ["roomService","freeService"]
  },
  title: {
    type: Schema.Types.Mixed,
    required: true
  },
  description: {
    type: Schema.Types.Mixed
  },
  image: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  last_modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = ServiceSchema;
