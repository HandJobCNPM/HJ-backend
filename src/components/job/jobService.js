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

    createJob: async (recruiterId, title, description, expiration, tags) => {
        const job = await Job.create({
            recruiterId,
            title,
            description,
            createDate: Date(),
            expiration,
            tags
        });
        return job ? job : null;
    },

    editJob: (id, title, description, expiration, tags) => {
        Job.updateOne({_id: id}, {
            title,
            description,
            expiration,
            tags
        });
        return true;
    },

    deleteJob: jobId => {
        Job.deleteOne({ _id: jobId });
        return true;
    }
};