var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  name: {
    type: Schema.Types.Mixed,
    required: true
  },
  images: [String],
  created_at: {
    type: Date,
    default: Date.now
  },
  last_modified: {
    type: Date
  }
});

AlbumSchema.pre('save', function(next){
  now = new Date();
  this.last_modified = now;
  next();
});

module.exports = AlbumSchema;
