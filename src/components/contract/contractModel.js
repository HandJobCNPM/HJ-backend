const mongoose = require('mongoose');

let contractSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    description: {
        type: String,
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
    recruiterName: {
        type: String,
        required: true
    },
    freelancerName: {
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
