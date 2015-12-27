var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RoomSchema = new Schema({
  title: {
    type: Schema.Types.Mixed,
    required: true
  },
  type: {
    type: Schema.Types.Mixed,
    required: true
  },
  description: {
    type: Schema.Types.Mixed,
    required: true
  },
  image: String,
  available: [{
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }],
  price: {
    type: Number,
    required: true
  },
  bed_number: Number,
  free_services: [{
    type: Schema.Types.Mixed
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  last_modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = RoomSchema;
