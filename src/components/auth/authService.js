const User = require('../user/userModel');
const hash = require('../../services/hash');
const { validateSignup } = require('./validate')

module.exports = {
    signup: async (name, email, password, confirmPassword) => {
        let validate = validateSignup(name, email, password, confirmPassword)
        if (validate === 'Success') {
            const user = await User.findOne({ email: email }).exec();
            if (user) {
                return { title: "email", message: "Exist email", name, email: "", password };
            }
            const hashedPwd = await hash.hashPwd(password);
            User.create({
                name,
                email,
                password: hashedPwd,
            });
            return true;
        }

        return validate
    },
};