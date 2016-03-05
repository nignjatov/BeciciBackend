module.exports = {
    "getCourseList": {
        "schema": {}
    },
    "updateCourseValue": {
        "schema": {
            "params": {
                "currency": {
                    type: String,
                    required: true
                },
                "body": {
                    value: {
                        type: String
                    }
                }
            }
        }
    }
}
