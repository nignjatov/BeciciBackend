module.exports = {
  "getReviews": {
    "schema": {}
  },
  "updateReviewStatus": {
    "schema": {
      "params": {
        "reviewId": {
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
  "createReview": {
    "schema": {
      "params": {},
      "body": {
        stars: {
          type: Number,
          required: true
        },
        language: {
          type: String,
          enum : Container.config.languages
        },
        description: {
          type: String
        },
        status: {
          type: String,
          enum: ['waiting', 'approved', 'rejected', 'archived'],
          required: true
        }
      }
    }
  },
  "deleteReview": {
    "schema": {
      "params": {
        "reviewId": {
          type: String,
          required: true,
          match: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        }
      }
    }
  }
}
