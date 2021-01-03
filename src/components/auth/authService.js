const User = require('../user/userModel');
const hash = require('../../services/hash');

module.exports = {
    signup: async (name, email, password) => {
        const user = await User.findOne({ email: email }).exec();
        if (user) {
            return false;
        }
        const hashedPwd = await hash.hashPwd(password);
        User.create({
            name,
            email,
            password: hashedPwd,
        });
        return true;
    }
};