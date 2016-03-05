var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    currency: {
        type: String
    },
    value: {
        type: String
    }
});

module.exports = CourseSchema;
