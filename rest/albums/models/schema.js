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
  }
});

module.exports = AlbumSchema;
