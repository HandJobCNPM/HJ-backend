const express = require('express');
const router = express.Router();
const service = require('./authService');
const passport = require('passport');
const { isLoggedIn } = require('../../middleware/auth/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
    res.redirect('/job');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/job');
    } else {
        res.render('form', { form: 'login' });
    }
});

router.get('/signup', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/job');
    } else {
        res.render('form', { form: 'signup' });
    }

});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }

        if (info) {
            req.flash('error', { title: 'all', message: info.message, email: '', password: ''});
            res.redirect('/login');
        } else {
            req.login(user, error => {
                if (error) {
                    return next(error);
                }

                res.redirect('/job');
            });
        }


    })(req, res, next);
});

router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    let signup = await service.signup(name, email, password, confirmPassword);

    if (typeof signup === 'boolean') {
        res.redirect('/login');
    } else {
        req.flash('error', signup);
        res.redirect('/signup');
    }
});

module.exports = router;