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
    enum: ['INIT', 'APPROVED', 'VOIDED', 'CAPTURED', 'CANCELED'],
    default: 'INIT',
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
    type: Date
  },
  updated_on: {
    type: Date
  },
  roomNumber : {
    type : String
  }
});

module.exports = ReservationSchema;
