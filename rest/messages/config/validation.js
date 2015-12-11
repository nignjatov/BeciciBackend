module.exports = {
  "getMessages": {
    "schema": {}
  },
  "updateMessageStatus": {
    "schema": {
      "params": {
        "messageId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        },
        "status": {
          type: String,
          enum: ['unread', 'read', 'replied', 'archived']
        }
      }
    }
  },
  "createMessage": {
    "schema": {
      "params": {},
      "body": {
        text: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['unread', 'read', 'replied', 'archived'],
          default: 'unread',
          required: true
        },
        last_status_update: {
          type: Date
        },
        created_at: {
          type: Date
        }
      }
    }
  },
  "deleteMessage": {
    "schema": {
      "params": {
        "messageId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  }
}
