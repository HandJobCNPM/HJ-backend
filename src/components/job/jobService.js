const { query } = require('express-validator');
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
        const job = Job.findOne({ _id: id });
        return job ? job : null;
    },

    createJob: async (recruiterId, recruiterName, photoPath, title, description, expiration, tags, paidMin, paidMax) => {
        if (!recruiterId || !title || !description || !expiration || !tags || !paidMin || !paidMax) {
            return null;
        }

        const job = new Job({
            recruiterId,
            recruiterName,
            photoPath,
            title,
            description,
            createDate: Date(),
            expiration,
            tags: tags.split(','),
            paidMin,
            paidMax
        });

        job.save((err, doc) => {
            if (err) { console.log(err); }

            if (process.env.ENV === 'production') {
                job.on('es-indexed', (err, res) => {
                    if (err) { console.log(err); }
                    console.log('Add job to elasticseach');
                });
            }

            return doc;
        });

        return job;
    },

    editJob: (id, title, description, expiration, tags, paidMin, paidMax) => {
        if (!id || !title || !description || !expiration || !tags || !paidMin || !paidMin) {
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
        Job.updateOne({ _id: id }, {
            title,
            description,
            expiration,
            tags: tags.split(','),
            paidMin,
            paidMax
        }, (err, docs) => {
            if (err) console.log(err)
        });
        return true;
    },

    deleteJob: async _id => {
        if (!_id) {
            return false;
        }
        await Job.deleteOne({ _id });
        return true;
    },

    appendComment: (jobId, freelancerId, photoPath, freelancerName, bid, applyReason) => {
        const comment = { jobId, freelancerId, photoPath, freelancerName, bid, applyReason }

        Job.updateOne({ _id: jobId }, { $push: { comments: comment } }, (err, docs) => {
            if (err) console.log(err)
        })
    },

    deleteComment: async (jobId, commentId) => {
        if (!jobId || !commentId) {
            return false;
        }
        const job = await Job.findByIdAndUpdate({ _id: jobId }, {
            $pull: { comments: { _id: commentId } }
        });

        if (!job) {
            return false;
        }
        return true;
    },

    searchJob: async query => {
        const results = await Job.fuzzySearch({
            query
        })

        return results
    },

    updateRecruiterPhoto: (recruiterId, photoPath) => {
        Job.updateOne({ recruiterId }, { photoPath }, (err, docs) => {
            if (err) console.log(err)
        })
    }
};