module.exports = {
  "getUser": {
    "permission": {}, // Think...
    "schema": {
      "params": {
        "userId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  },
  "getUsers": {
    "permission": {}, // Think...
    "schema": {}
  },
  "updateUser": {
    "permission": {}, // Think...
    "schema": {
      "params": {
        "userId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      },
      "body": {
        "firstName": {
          type: String
        },
        "lastName": {
          type: String
        },
        "username": {
          type: String
        },
        "email": {
          type: String,
          match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        },
        "phone": {
          type: String
        }
      }
    }
  },
  "createUser": {
    "permission": {}, // Think...
    "schema": {
      "params": {},
      "body": {
        "firstName": {
          type: String,
          required: true
        },
        "lastName": {
          type: String,
          required: true
        },
        "username": {
          type: String,
          required: true
        },
        "email": {
          type: String,
          required: true,
          match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        },
        "phone": {
          type: String
        }
      }
    }
  },
  "deleteUser": {
    "permission": {}, // Think...
    "schema": {
      "params": {
        "userId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  }
}
