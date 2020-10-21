const User = require('./userModel');

module.exports = {
    getUserByEmail: async email => {
        const user = await User.findOne({ email: email }).select('+password').exec();
        return user ? user : null;
    },

    getUserById: async id => {
        const user = await User.findById(id).exec();
        return user ? user : null;
    },

    addPostedJob: async (userId, jobId, title) => {
        const user = await User.findByIdAndUpdate({_id: userId}, {
            $push: {'recruiterMode.postedJobs': {jobId, title}}
        });
        return user ? user : null;
    }
};