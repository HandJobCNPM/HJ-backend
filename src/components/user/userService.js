const User = require('./userModel');

module.exports = {
    getUser: async id => {
        const user = await User.findById(id).exec();
        if (!user) {
            return { _error: 'User not found' };
        }
        return { _user: user };
    }
};