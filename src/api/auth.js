const express = require('express');
const router = express.Router();
const service = require('../components/auth/authService');
const passport = require('passport');
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
// eslint-disable-next-line no-unused-vars
}), (req, res) => {});

router.post('/signup', async (req, res) => {
    const { name, phone, email, password, address } = req.body;
    res.json(await service.signup(name, phone, email, password, address));
});

module.exports = router;