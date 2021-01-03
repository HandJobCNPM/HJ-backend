function validate(name, email, password, confirmPassword) {
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ msg: 'Please fill in all fields.' });
    }

    // Check password length
    if (password.length < 8) {
        errors.push({ msg: 'Password to short.' });
    }

    // Check passwords match
    if (password != confirmPassword) {
        errors.push({ msg: 'Password do not match.' });
    }

    return (errors.length > 0) ? errors : 'Success';
}

module.exports = {
    validateSignup: validate
};