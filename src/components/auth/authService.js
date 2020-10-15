const User = require('../user/userModel');
const hash = require('../../services/hash');

module.exports = {
    signup: async (name, phone, email, password, address) => {
        const user = await User.findOne({ email: email }).exec();
        if (user) {
            return false;
        }
        const hashedPwd = hash.hashPwd(password);
        User.create({
            name,
            phone,
            email,
            password: hashedPwd,
            address
        });
        return true;
    }
};