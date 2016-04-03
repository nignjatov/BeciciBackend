var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PriceSchema = new Schema({
    filename: {
        type: String,
        required: true
    }
});

module.exports = PriceSchema;
