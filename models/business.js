const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        lowercase: true
    },
    waitlist: {
        type: Number,
        default: 0,
        waiting: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    }
});

module.exports = mongoose.model('Business', businessSchema);