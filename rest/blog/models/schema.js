var mongoose = require('mongoose');
var lastMod = require('../../../libs/last-modified');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  blogType: {
    type: String,
    enum: ["news","about","timeline","banner"],
    required: true
  },
  title: {
    type: Schema.Types.Mixed,
    required: true
  },
  description: {
    type: Schema.Types.Mixed,
    required: true
  },
  multimedia: String,
  moment: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_modified: {
    type: Date
  }
});


BlogSchema.pre('save', function(next){
  now = new Date();
  this.last_modified = now;
  next();
});

module.exports = BlogSchema;
