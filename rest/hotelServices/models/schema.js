var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ServiceSchema = new Schema({
  serviceType: {
    type: String,
    enum: ["roomService","freeService"]
  },
  title: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: Container.config.languages
  },
  description: {
    type: String,
    maxlength: Container.config.descriptionMaxLength
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
