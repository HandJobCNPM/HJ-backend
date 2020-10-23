const User = require('./userModel');

module.exports = {
    getAllUsers: async () => {
        const users = await User.find({}).exec();
        return users ? users : null;
    },

    getUserByEmail: async email => {
        const user = await User.findOne({ email: email }).select('+password').exec();
        return user ? user : null;
    },

    getUserById: async id => {
        const user = await User.findById(id).exec();
        return user ? user : null;
    },

    addPostedJob: async (userId, userMode, jobId, title) => {
        const job = { jobId, title };
        const query = {
            recruiter: { 'recruiterMode.achievements': job },
            freelancer: { 'freelancerMode.achievements': job },
        };
        const user = await User.findByIdAndUpdate({_id: userId}, {
            $push: query[userMode]
        });
        return user ? user : null;
    },

    editUser: async (userId, name, phone, password, photoPath, address) => {
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            name, phone, password, photoPath, address
        });
        return user ? user : null;
    },

    addAchievements: async (userId, userMode, contractId, title) => {
        const contract = { contractId, title };
        const query = {
            recruiter: { 'recruiterMode.achievements': contract },
            freelancer: { 'freelancerMode.achievements': contract },
        };
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $push: query[userMode]
        });
        return user ? user : null;
    },

    editRecruiter: async (userId, bio) => {
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $set: { 'recruiterMode.bio': bio }
        });
        return user ? user : null;
    },

    editFreelancer: async (userId, bio, skills, rating) => {
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $set: {
                'freelancerMode.bio': bio,
                'freelancerMode.skills': skills
            },
            $inc: { ratingCount: 1, rating: rating }
        });
        return user ? user : null;
    },

    deleteUser: async userId => {
        await User.deleteOne({ _id: userId });
        return true;
    }
};