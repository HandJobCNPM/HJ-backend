const bcrypt = require('bcrypt');

module.exports = {
    hashPwd: password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },

    isPwdMatched: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
};