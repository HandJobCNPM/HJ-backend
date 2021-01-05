const Job = require('./jobModel');

module.exports = {
    getAllJobs: () => {
        const jobs = Job.find({});
        return jobs ? jobs : null;
    },

    getJobById: id => {
        if (!id) {
            return null;
        }
        const job = Job.findOne({_id: id});
        return job ? job : null;
    },

    createJob: async (recruiterId, title, description, expiration, tags, paidMin, paidMax) => {
        if (!recruiterId || !title || !description || !expiration || !tags || !paidMin || !paidMax) {
            return null;
        }
        const job = await Job.create({
            recruiterId,
            title,
            description,
            createDate: Date(),
            expiration,
            tags,
            paidMin,
            paidMax
        });
        return job ? job : null;
    },

    editJob: (id, title, description, expiration, tags, paidMin, paidMax) => {
        if (!id || !title ||!description || !expiration || !tags || !paidMin || !paidMin){
            let errors = [];
            if (!id) {
                errors.push('Error occured cause id is empty.');
            }
            if (!title) {
                errors.push('Error occured cause title is empty.');
            }
            if (!description) {
                errors.push('Error occured cause description is empty.');
            }
            if (!expiration) {
                errors.push('Error occured cause expiration is empty.');
            }
            if (!tags) {
                errors.push('Error occured cause tags is empty.');
            }
            if (!paidMin) {
                errors.push('Error occured cause paid min is empty.');
            }
            if (!paidMax) {
                errors.push('Error occured cause pad max is empty.');
            }
            return errors;
        }
        Job.updateOne({_id: id}, {
            title,
            description,
            expiration,
            tags,
            paidMin,
            paidMax
        });
        return true;
    },

    deleteJob: jobId => {
        if (!jobId) {
            return false;
        }
        Job.deleteOne({ _id: jobId });
        return true;
    }
};