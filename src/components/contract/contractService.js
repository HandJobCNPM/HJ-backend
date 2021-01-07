const jobService = require('../job/jobService');
const userService = require('../user/userService');
const Contract = require('./contractModel');

module.exports = {
    getContractById: async _id => {
        let errors = [];
        if (!_id) {
            errors.push('Error occured cause title is emmpty.');
            return errors;
        }
        const contract = await Contract.findOne({ _id });
        if (!contract) {
            errors.push('Error occured when get contract.');
        }
        return errors.length > 0 ? errors : contract;
    },

    createContract: async (jobId, title, salary, recruiterId, freelancerId, recruiterName, freelancerName, description) => {
        if (!salary || !recruiterId || !freelancerId || !recruiterName || !freelancerName || !description) {
            return null;
        }

        const contract = await Contract.create({
            title,
            salary,
            recruiterId,
            freelancerId,
            recruiterName,
            freelancerName,
            description,
            acceptDate: Date(),
        });

        userService.addAchievements(recruiterId, 'recruiter', contract._id, title)
        userService.addAchievements(freelancerId, 'freelancer', contract._id, title)

        jobService.deleteJob(jobId)

        return contract ? contract : null;
    },

    finishContract: _id => {
        Contract.updateOne({ _id }, { finished: true }, (err, doc) => {
            if (err) console.log(err)
        })
    }
};