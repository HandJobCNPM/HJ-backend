const mongoose = require('mongoose');

let ContractObj = {
    contractId: String,
    title: String
};

let JobObj = {
    jobId: String,
    title: String
};

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    photoPath: {
        type: String, default: ''
    },
    address: {
        type: String,
        required: true
    },
    recruiterMode: {
        bio: String,
        achievements: [ContractObj],
        postedJobs: [JobObj]
    },
    freelancerMode: {
        bio: String,
        skills: [String],
        ratingCount: Number,
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        achievements: [ContractObj],
        appliedJobs: [JobObj]
    }
});

module.exports = User = mongoose.model('User', userSchema);