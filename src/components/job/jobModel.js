const mongoose = require('mongoose');

let CandidateObj = {
    freelancerPhotoUrl: {
        type: String,
        required: true
    },
    freelancerId: {
        type: String,
        required: true
    },
    freelancerName: {
        type: String,
        required: true
    },
    bid: {
        type: String,
        required: true
    },
    applyReason: {
        type: String,
        required: true
    }
};

let jobSchema = new mongoose.Schema({
    recruiterId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    expiration: {
        type: Date,
        required: true
    },
    tags: [String],
    comment: [CandidateObj]
});

module.exports = Job = mongoose.model('Job', jobSchema);