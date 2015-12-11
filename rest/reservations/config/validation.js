module.exports = {
  "getReservations": {
    "schema": {}
  },
  "updateReservationStatus": {
    "schema": {
      "params": {
        "reservationId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        },
        "status": {
          type: String,
          enum: ['waiting', 'approved', 'rejected', 'archived']
        }
      }
    }
  },
  "createReservation": {
    "schema": {
      "params": {},
      "body": {
        //roomType : {
        //  type: Schema.Types.ObjectId,
        //  ref: 'Room',
        //  required: true},
        //userId : {
        //  type: Schema.Types.ObjectId,
        //  ref: 'User',
        //  required: true},
        //transactionId : {
        //  type: Schema.Types.ObjectId,
        //  ref: 'Transaction',
        //  required: true},
        status: {
          type: String,
          enum: ['waiting', 'approved', 'rejected', 'archived'],
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
        }
      }
    }
  },
  "deleteReservation": {
    "schema": {
      "params": {
        "reservationId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  }
}
