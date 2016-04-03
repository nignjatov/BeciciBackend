var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    title: {
        type: Schema.Types.Mixed,
        required: true
    },
    type: {
        type: Schema.Types.Mixed,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    description: {
        type: Schema.Types.Mixed,
        required: true
    },
    child_discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    child_bed_discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    image: String,
    available: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        remained : {
            type : Number,
            required : true,
        },
        price: {type: Schema.Types.Mixed},
    }],
    bed_number: Number,
    big_bed: Boolean,
    free_services: [{
        type: Schema.Types.Mixed
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    last_modified: {
        type: Date,
    }
});

RoomSchema.pre('save', function (next) {
    now = new Date();
    this.last_modified = now;
    next();
});

module.exports = RoomSchema;
