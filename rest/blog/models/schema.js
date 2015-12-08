var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  blogType: {
    type: String,
    enum: ["news","about","timeline"],
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
  multimedia: Schema.Types.Mixed, //file hash + type: img/video
  moment: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = BlogSchema;
