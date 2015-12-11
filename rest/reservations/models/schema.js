var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
  roomType : {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true},
  userId : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true},
  transactionId : {
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true},
  status: {
    type: String,
    enum: ['waiting', 'approved', 'rejected', 'archived'],
    default: 'waiting',
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = ReservationSchema;
