var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartnerSchema = new Schema({
    title: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
    },
    address: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = PartnerSchema;
