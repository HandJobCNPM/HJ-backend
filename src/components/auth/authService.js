const jwt = require('jsonwebtoken');
const User = require('../user/userModel');
const hash = require('../../services/hash');
const { options } = require('../../config/jwtCfg');

module.exports = {
    login: async (email, password) => {
        const user = await User.findOne({ email: email }).select('+password').exec();
        if (user && hash.isPwdMatched(password, user.password)) {
            const payload = { pl: 'pl' };
            const token = jwt.sign(payload, process.env.SECRET, options());
            return { _token: token };
        }
        return { _error: 'Incorrect email/password' };
    },

    signup: async (name, phone, email, password, address) => {
        const user = await User.findOne({ email: email }).exec();
        if (user) {
            return { _error: 'User already exists'};
        }
        const hashedPwd = hash.hashPwd(password);
        User.create({
            name,
            phone,
            email,
            password: hashedPwd,
            address
        });

        return { _msg: 'User registered' };
    }
};