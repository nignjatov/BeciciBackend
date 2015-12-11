module.exports = {
  "getRooms": {
    "schema": {}
  },
  "updateRoom": {
    "schema": {
      "params": {
        "roomId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      },
      "body": {
        //title: {
        //  type: Schema.Types.Mixed
        //},
        //type: {
        //  type: Schema.Types.Mixed
        //},
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
          type: Number
        },
        bed_number: Number,
        //free_services: [{
        //  type: Schema.Types.ObjectId,
        //  ref: 'Service'
        //}],
        created_at: {
          type: Date
        },
        last_modified: {
          type: Date
        }
      }
    }
  },
  "createRoom": {
    "schema": {
      "params": {},
      "body": {
        //title: {
        //  type: Schema.Types.Mixed,
        //  required: true
        //},
        //type: {
        //  type: Schema.Types.Mixed,
        //  required: true
        //},
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
        //free_services: [{
        //  type: Schema.Types.ObjectId,
        //  ref: 'Service'
        //}],
        created_at: {
          type: Date
        },
        last_modified: {
          type: Date
        }
      }
    }
  },
  "deleteRoom": {
    "schema": {
      "params": {
        "roomId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  }
}
