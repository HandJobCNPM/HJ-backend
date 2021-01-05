const User = require('../user/userModel');
const hash = require('../../services/hash');
const { validateLogin, validateSignup } = require('./validate');

module.exports = {
    signup: async (name, email, password, confirmPassword) => {
        if (validateSignup(name, email, password, confirmPassword) === 'Success') {
            if (password === confirmPassword) {
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
        }
    },

    login: async (email, password) => {
        if (validateLogin(email, password) === 'Success') {
            const hashedPwd = await hash.hashPwd(password);
            const user = await User.findOne({ email: email, password: hashedPwd }).exec();
            if (user) {
                return true;
            }
        }
    }
};