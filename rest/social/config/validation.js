module.exports = {
  "getSocialNetworks": {
    "schema": {}
  },
  "updateSocialNetworkActivity": {
    "schema": {
      "params": {
        "socialId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        },
        "active": {
          type: Boolean,
          required: true
        }
      }
    }
  },
  "createSocialNetwork": {
    "schema": {
      "params": {},
      "body": {
        network: {
          type: String,
          enum: ['facebook', 'twitter', 'youtube'],
          required: true,
        },
        link: {
          type: String
        },
        active: {
          type: Boolean,
          required: true
        }
      }
    }
  }
}
