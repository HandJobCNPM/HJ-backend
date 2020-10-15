const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');
const userService = require('../components/user/userService');

router.get('/user/:id', isLoggedIn, async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
});

module.exports = router;