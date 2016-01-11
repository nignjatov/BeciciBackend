var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ServiceSchema = new Schema({
  serviceType: {
    type: String,
    enum: ["roomService","freeService"],
    required: true
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
    type: Date
  }
});

ServiceSchema.pre('save', function(next){
  now = new Date();
  this.last_modified = now;
  next();
});
module.exports = ServiceSchema;
