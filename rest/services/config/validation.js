module.exports = {
  "getServices": {
    "schema": {}
  },
  "updateService": {
    "schema": {
      "params": {
        "serviceId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      },
      "body": {
        serviceType: {
          type: String,
          enum: ["roomService","freeService"]
        },
        //title: {
        //  type: Schema.Types.Mixed,
        //},
        //description: {
        //  type: Schema.Types.Mixed
        //},
        image: String,
        created_at: {
          type: Date,
        },
        last_modified: {
          type: Date,
        }
      }
    }
  },
  "createService": {
    "schema": {
      "params": {},
      "body": {
        serviceType: {
          type: String,
          enum: ["roomService","freeService"],
          required: true
        },
        //title: {
        //  type: Schema.Types.Mixed,
        //  required: true
        //},
        //description: {
        //  type: Schema.Types.Mixed
        //},
        image: String,
        created_at: {
          type: Date,
        },
        last_modified: {
          type: Date,
        }
      }
    }
  },
  "deleteService": {
    "permission": {}, // Think...
    "schema": {
      "params": {
        "serviceId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  }
}
