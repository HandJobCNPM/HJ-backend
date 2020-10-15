const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth/authenticate');
const service = require('../components/auth/authService');

router.get('/logout', authenticate, (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const resData = await service.login(email, password);
    if (!resData.hasOwnProperty('_error')) {
        res.cookie('token', resData['_token']).sendStatus(200);
        return;
    }
    res.status(401).json(resData);
});

router.post('/signup', async (req, res) => {
    const { name, phone, email, password, address } = req.body;
    const resData = await service.signup(name, phone, email, password, address);
    if (!resData.hasOwnProperty('_error')) {
        console.log(resData);
        res.status(200).json(resData);
        return;
    }
    res.status(400).json(resData);
});

module.exports = router;