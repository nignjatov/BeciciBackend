module.exports = {
  "getBlogs": {
    "schema": {}
  },
  "updateBlog": {
    "schema": {
      "params": {
        "blogId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      },
      "body": {
        blogType: {
          type: String,
          enum: ["news","about","timeline"],
          required: true
        },
        //title: {
        //  type: Schema.Types.Mixed,
        //  required: true
        //},
        //description: {
        //  type: Schema.Types.Mixed,
        //  required: true
        //},
        //multimedia: Schema.Types.Mixed, //file hash + type: img/video
        moment: {
          type: Date
        },
        created_at: {
          type: Date
        },
        last_modified: {
          type: Date
        }
      }
    }
  },
  "createBlog": {
    "schema": {
      "params": {},
      "body": {
        blogType: {
          type: String,
          enum: ["news","about","timeline"],
          required: true
        },
        //title: {
        //  type: Schema.Types.Mixed,
        //  required: true
        //},
        //description: {
        //  type: Schema.Types.Mixed,
        //  required: true
        //},
        //multimedia: Schema.Types.Mixed, //file hash + type: img/video
        moment: {
          type: Date
        },
        created_at: {
          type: Date
        },
        last_modified: {
          type: Date
        }
      }
    }
  },
  "deleteBlog": {
    "schema": {
      "params": {
        "blogId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  }
}
