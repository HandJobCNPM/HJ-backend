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
    name: String,
    phone: String,
    email: String,
    password: {
        type: String,
        select: false
    },
    photoPath: {
        type: String, default: ''
    },
    address: String,
    recruiterMode: {
        bio: String,
        achievements: [ContractObj],
        postedJobs: [JobObj]
    },
    freelancerMode: {
        bio: String,
        skills: [String],
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