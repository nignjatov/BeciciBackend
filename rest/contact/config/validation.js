module.exports = {
  "getContactInfo": {
    "schema": {}
  },
  "sendEmailMessage": {
    "schema": {
      "body": {
        replyTo: {
          type: String,
          match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        },
        name: {
          type: String
        },
        subject: {
          type: String
        },
        message: {
          type: String
        }
      }
    }
  },
  "updateContactInfo": {
    "schema": {
      "params": {
        "contactId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        },
        "body": {
          phone: {
            type: String
          },
          fax: {
            type: String
          },
          email: {
            type: String,
            match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
          },
          longitude: {
            type: Number
          },
          latitude: {
            type: Number
          },
          address: {
            type: String
          },
          city: {
            type: String
          },
          state: {
            type: String
          },
          website: {
            type: String
          }
        }
      }
    }
  },
  "createContactInfo": {
    "schema": {
      "params": {},
      "body": {
        phone: {
          type: String
        },
        fax: {
          type: String
        },
        email: {
          type: String,
          match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        },
        longitude: {
          type: Number
        },
        latitude: {
          type: Number
        },
        address: {
          type: String
        },
        city: {
          type: String
        },
        state: {
          type: String
        },
        website: {
          type: String
        }
      }
    }
  }
}
