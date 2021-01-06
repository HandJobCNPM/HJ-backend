const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

let CandidateObj = {
    jobId: {
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
    photoPath: {
        type: String,
        default: '/img/user.svg'
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
    recruiterName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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
    paidMin: {
        type: Number,
        required: true
    },
    paidMax: {
        type: Number,
        required: true
    },
    comments: [CandidateObj]
});

jobSchema.plugin(mongoose_fuzzy_searching, { fields: ['title'] });

module.exports = Job = mongoose.model('Jobs', jobSchema);