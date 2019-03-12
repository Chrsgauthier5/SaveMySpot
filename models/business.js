const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        lowercase: true
    },
    numWaiting: {
        type: Number,
        default: 0,
    },
    waitTime: {
        type: Number,
        default: 0,
    },
    waitlist: {
        type: Array,
        default: []
    },
    waitlistUserInfo: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Business', businessSchema, 'Business');

//seed: db.business.insert({businessName: "Jeff's Burgers", numWaiting: 2, waitList: ['chris','diane']});