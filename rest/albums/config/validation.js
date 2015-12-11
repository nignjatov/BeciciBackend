module.exports = {
  "getAlbums": {
    "schema": {}
  },
  "renameAlbum": {
    "schema": {
      "params": {
        "albumId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      },
      "body": {
        name: {
          type: String,
          required: true
        }
      }
    }
  },
  "createAlbum": {
    "schema": {
      "params": {},
      "body": {
        //name: {
        //  type: Schema.Types.Mixed,
        //  required: true
        //},
        images: [ String ],
        created_at: {
          type: Date
        }
      }
    }
  },
  "deleteAlbum": {
    "schema": {
      "params": {
        "albumId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  },
  "addImage": {
    "schema": {
      "params": {
        "albumId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      },
      "body": {
        image: {
          type: String,
          required: true
        }
      }
    }
  },
  "deleteImage": {
    "schema": {
      "params": {
        "albumId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        },
        "image":{
          type: String,
          required: true
        }
      }
    }
  }
}
