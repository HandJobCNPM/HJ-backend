const jobService = require('../job/jobService');
const userService = require('../user/userService');
const Contract = require('./contractModel');

module.exports = {
    getContractById: _id => {
        let errors = [];
        if (!_id) {
            errors.push('Error occured cause title is emmpty.');
            return errors;
        }
        const contract = Contract.findOne({ _id });
        if (!contract) {
            errors.push('Error occured when get contract.');
        }
        return errors.length > 0 ? errors : contract;
    },

    createContract: async (jobId, title, salary, recruiterId, freelancerId) => {
        if (!salary || !recruiterId || !freelancerId) {
            return null;
        }

        const contract = await Contract.create({
            title,
            salary,
            recruiterId,
            freelancerId,
            acceptDate: Date(),
        });

        userService.addAchievements(recruiterId, 'recruiter', contract._id, title)
        userService.addAchievements(freelancerId, 'freelancer', contract._id, title)

        jobService.deleteJob(jobId)

        return contract ? contract : null;
    },
};