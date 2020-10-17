const User = require('./userModel');

module.exports = {
    getUserByEmail: async email => {
        const user = await User.findOne({ email: email }).select('+password').exec();
        return user ? user : null;
    },

    getUserById: async id => {
        const user = await User.findById(id).exec();
        return user ? user : null;
    }
};