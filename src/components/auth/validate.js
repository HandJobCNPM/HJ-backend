const expressValidator = require('express-validator');

exports.validateLogin = (email, password) => {
    let error = {};

    if (!email) {
        error = { title: 'email', message: 'Invalid name', email: '', password };
        return error;
    }

    if (!password || password.length < 8) {
        error = { title: 'password', message: 'Invalid password', email, password: '' };
        return error;
    }

    return 'Success';
};

exports.validateSignup = (name, email, password, confirmPassword) => {
    let error = {};

    if (!name) {
        error = { title: 'name', message: 'Invalid name', name: '', email, password };
        return error;
    }

    if (!email) {
        error = { title: 'email', message: 'Invalid name', name, email: '', password };
        return error;
    }

    if (!password || password.length < 8) {
        error = { title: 'password', message: 'Invalid password', name, email, password: '' };
        return error;
    }

    if (!confirmPassword || confirmPassword !== password) {
        error = { title: 'confirmPassword', message: 'Invalid confirm password', name, email, password: '' };
        return error;
    }

    return 'Success';
};