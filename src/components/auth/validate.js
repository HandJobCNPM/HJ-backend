const expressValidator = require('express-validator');

exports.validateLogin = (email, password) => {
    let errors = [];
    if (!email || !password) {
        errors.push({ msg: 'Please fill in all fields.' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password to short.' });
    }
    return (errors.length > 0) ? errors : 'Success';
}

exports.validateSignup = (name, email, password, confirmPassword) => {
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