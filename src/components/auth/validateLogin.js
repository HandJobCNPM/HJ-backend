function validate(email, password) {
    let errors = [];
    if (!email || !password) {
        errors.push({ msg: 'Please fill in all fields.' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password to short.' });
    }
    return (errors.length > 0) ? errors : 'Success';
}

module.exports = {
    validateLogin: validate
};