const jobModel = require('../job/jobModel');
const Contract = require('./contractModel');

module.exports = {
    getAllContract: () => {
        const contracts = Contract.find({});
        return contracts ? contracts : null;
    },
    getContractBytitle: title => {
        /*
        if (!title) {
            return null;
        }*/
        let errors = [];
        if (!title) {
            errors.push('Error occured cause title is emmpty.');
            return errors;
        }
        const contract = Contract.findOne({ _title: title });
        if (!contract) {
            errors.push('Error occured when get contract.');
        }
        return errors.length > 0 ? errors : contract;
    },

    editContract: (title, description, salary, tags, recruiterId, freelancerId, acceptDate, finished) => {
        let errors = [];
        if (!title || !description || !salary || !tags || !recruiterId || !freelancerId || !acceptDate || !finished) {
            if (!title) {
                errors.push('Error occured cause title is empty.');
            }
            if (!description) {
                errors.push('Error occured cause description is empty.');
            }
            if (!salary) {
                errors.push('Error occured cause salary is empty.');
            }
            if (!tags) {
                errors.push('Error occured cause tag is empty.');
            }
            if (!recruiterId) {
                errors.push('Error occured cause recruiter id is empty.');
            }
            if (!freelancerId) {
                errors.push('Error occured cause freelancer id is empty.');
            }
            if (!acceptDate) {
                errors.push('Error occured cause accept date is empty.');
            }
            if (finished === null) {
                errors.push('Error occured cause finished is empty.');
            }
            return errors;
        }
        Contract.updateOne({ _title: title }, {
            title,
            description,
            salary,
            tags,
            recruiterId,
            freelancerId,
            acceptDate,
            finished
        });

        return true;
    },

    createContract: async (title, description, salary, tags, recruiterId, freelancerId, acceptDate, finished) => {
        if (!title || !description || !salary || !tags || !recruiterId || !freelancerId || !acceptDate || !finished) {
            return null;
        }

        const contract = await Contract.create({
            title,
            description,
            salary,
            tags,
            recruiterId,
            freelancerId,
            acceptDate: Date(),
            finished
        });

        return contract ? contract : null;
    },

    deleteContract: title => {
        if (!title) {
            return false;
        }
        jobModel.deleteOne({_title: title});
        return true;
    }
};