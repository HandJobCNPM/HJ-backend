const express = require('express');
const router = express.Router();
const service = require('../components/auth/authService');
const passport = require('passport');
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
    res.redirect('/job')
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('form', { form: 'login' })
})

router.get('/signup', (req, res) => {
    res.render('form', { form: 'signup' })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
    // eslint-disable-next-line no-unused-vars
}), (req, res) => {
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    let signup = await service.signup(name, email, password);

    res.redirect('/login')
});

module.exports = router;