const bcrypt = require('bcrypt');
const SALT = 10

module.exports = {
    hashPwd: password => {
        return bcrypt.hash(password, SALT)
    },

    isPwdMatched: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
};