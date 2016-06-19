var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PriceSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true,
        enum: ["priceList","individualReservation","groupReservation"],
    }
});

module.exports = PriceSchema;
