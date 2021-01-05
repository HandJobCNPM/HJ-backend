const Job = require('./jobModel');

module.exports = {
    getAllJobs: () => {
        const jobs = Job.find({});
        return jobs ? jobs : null;
    },

    getJobById: id => {
        const job = Job.findOne({_id: id});
        return job ? job : null;
    },

    createJob: async (recruiterId, title, description, expiration, tags, paidMin, paidMax) => {
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
        Job.deleteOne({ _id: jobId });
        return true;
    }
};