const mongoose = require('mongoose');

let contractSchema = new mongoose.Schema({
    salary: {
        type: Number,
        required: true
    },
    recruiterId: {
        type: String,
        required: true
    },
    freelancerId: {
        type: String,
        required: true
    },
    acceptDate: {
        type: Date,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    }
});

module.exports = Contract = mongoose.model('Contract', contractSchema);
