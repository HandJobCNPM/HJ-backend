const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware/auth/isLoggedIn');
const { isCurUser } = require('../../middleware/auth/verifyUser');
const userService = require('./userService');

router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/user/' + req.user._id)
    } else {
        res.render('404')
    }
});

router.get('/:id', async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    if (req.isAuthenticated()) {
        console.log(user)
        res.render('profile', { role: "own", username: req.user.name, user })
    } else {
        console.log(user)
        res.render('profile', { role: "guest", user })
    }
});

router.put('/:id', [isLoggedIn, isCurUser], async (req, res) => {
    const {
        name,
        phone,
        email,
        address
    } = req.body;
    await userService.editUser(
        req.params.id,
        name,
        phone,
        email,
        address
    );
    res.redirect('/user')
});

router.put('/recruiter/:id', [isLoggedIn, isCurUser], async (req, res) => {
    const { bio } = req.body;
    const user = await userService.editRecruiter(req.params.id, bio);
    res.json(user);
});

router.put('/freelancer/:id', [isLoggedIn, isCurUser], async (req, res) => {
    const { bio, skills, rating } = req.body;
    const user = await userService.editFreelancer(req.params.id, bio, skills, rating);
    res.json(user);
});

router.delete('/:id', [isLoggedIn, isCurUser], async (req, res) => {
    const userDeleted = await userService.deleteUser(req.params.id);
    res.json(userDeleted);
});

module.exports = router;