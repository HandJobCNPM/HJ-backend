const User = require('./userModel');

module.exports = {
    getAllUsers: async () => {
        let errors = [];
        const users = await User.find({}).exec();
        if (!users) {
            errors.push('Error occured when find user.');
            return errors;
        }
        return errors.length > 0 ? errors : users;
    },

    getUserByEmail: async email => {
        let errors = [];
        if (!email) {
            errors.push('Error occured cause email is emmpty.');
            return errors;
        }
        const user = await User.findOne({ email: email }).select('+password').exec();
        if (!user) {
            errors.push('Error occured when find user.');
        }
        return errors.length > 0 ? errors : user;
    },

    getUserById: async id => {
        let errors = [];
        if (!id) {
            errors.push('Error occured cause id is emmpty.');
            return errors;
        }
        const user = await User.findById(id).exec();
        if (!user) {
            errors.push('Error occured when find user.');
        }
        return errors.length > 0 ? errors : user;
    },

    addJob: async (userId, userMode, jobId, title) => {
        let errors = [];
        if (!userId) {
            errors.push('Error occured cause user id is emmpty.');
        }
        if (!userMode) {
            errors.push('Error occured cause user mode is emmpty.');
        }
        if (!jobId) {
            errors.push('Error occured cause job id is emmpty.');
        }
        if (!title) {
            errors.push('Error occured cause title is emmpty.');
        }
        if (errors.length > 0) {
            return errors;
        }
        const job = { jobId, title };
        const query = {
            recruiter: { 'recruiterMode.postedJobs': job },
            freelancer: { 'freelancerMode.appliedJobs': job },
        };
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $push: query[userMode]
        });

        if (!user) {
            errors.push('Error occured cause user is null.');
            return errors;
        }
        return user;
    },

    editUser: async (userId, name, phone, password, photoPath, address) => {
        let errors = [];
        if (!userId) {
            errors.push('Error occured cause user id is empty.');
        }
        if (!name) {
            errors.push('Error occured cause name is empty.');
        }
        if (!password) {
            errors.push('Error occured cause password is empty.');
        }
        if (!photoPath) {
            errors.push('Error occured cause photo path is empty.');
        }
        if (!address) {
            errors.push('Error occured cause address is empty.');
        }
        if (errors.length > 0) {
            return errors;
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            name, phone, email, address
        });
        if (!user) {
            errors.push('Error occured cause user is null.');
            return errors;
        }
        return user;
    },

    addAchievements: async (userId, userMode, contractId, title) => {
        let errors = [];
        if (!userId) {
            errors.push('Error occured cause user id is empty.');
        }
        if (!userMode) {
            errors.push('Error occured cause user mode is empty.');
        }
        if (!contractId) {
            errors.push('Error occured cause contract id is empty.');
        }
        if (!title) {
            errors.push('Error occured cause title is empty.');
        }
        if (errors.length > 0) {
            return errors;
        }
        const contract = { contractId, title };
        const query = {
            recruiter: { 'recruiterMode.achievements': contract },
            freelancer: { 'freelancerMode.achievements': contract },
        };
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $push: query[userMode]
        });
        if (!user) {
            errors.push('Error occured cause user is null.');
            return errors;
        }
        return user;
    },

    editRecruiter: async (userId, bio) => {
        let errors = [];
        if (!userId) {
            errors.push('Error occured cause user id is empty.');
        }
        if (!bio) {
            errors.push('Error occured cause bio is empty.');
        }
        if (errors.length > 0) {
            return errors;
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $set: { 'recruiterMode.bio': bio }
        });
        if (!user) {
            errors.push('Error occured cause user is null.');
            return errors;
        }
        return user;
    },

    editFreelancer: async (userId, bio, skills, rating) => {
        let errors = [];
        if (!userId) {
            errors.push('Error occured cause user id is empty.');
        }
        if (!bio) {
            errors.push('Error occured cause bio is empty.');
        }
        if (!skills) {
            errors.push('Error occured cause user skills is empty.');
        }
        if (!rating) {
            errors.push('Error occured cause rating is empty.');
        }
        if (errors.length > 0) {
            return errors;
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $set: {
                'freelancerMode.bio': bio,
                'freelancerMode.skills': skills
            },
            $inc: { ratingCount: 1, rating: rating }
        });
        if (!user) {
            errors.push('Error occured cause user is null.');
            return errors;
        }
        return user;
    },

    deleteUser: async userId => {
        if (!userId) {
            return false;
        }
        await User.deleteOne({ _id: userId });
        return true;
    },

    deleteJob: async (userId, userMode, jobId) => {
        let errors = [];
        if (!userId) {
            errors.push('Error occured cause user id is empty.');
        }
        if (!userMode) {
            errors.push('Error occured cause user mode is empty.');
        }
        if (!jobId) {
            errors.push('Error occured cause jod id is empty.');
        }
        if (errors.length > 0) {
            return errors;
        }
        const query = {
            recruiter: { 'recruiterMode.postedJobs': { jobId: jobId } },
            freelancer: { 'freelancerMode.appliedJobs': { jobId: jobId } },
        };
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $pull: query[userMode]
        });
        if (!user) {
            errors.push('Error occured cause user is null.');
            return errors;
        }
        return user;
    },

    uploadImage: async (_id, photoPath) => {
        await User.updateOne({ _id }, { photoPath })
    }
};