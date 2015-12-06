var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  language: {
    type: String,
    enum : Container.config.languages
  },
  description: {
    type: String,
    maxlength : 300
  },
  status: {
    type: String,
    enum: ['waiting', 'approved', 'rejected', 'archived'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = ReviewSchema;
