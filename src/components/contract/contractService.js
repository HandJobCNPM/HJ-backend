const jobModel = require('../job/jobModel');
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

    createContract: async (salary, recruiterId, freelancerId, acceptDate) => {
        if (!salary || !recruiterId || !freelancerId || !acceptDate) {
            return null;
        }

        const contract = await Contract.create({
            salary,
            recruiterId,
            freelancerId,
            acceptDate: Date(),
        });

        return contract ? contract : null;
    },
};