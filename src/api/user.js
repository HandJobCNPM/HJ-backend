const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');
const userService = require('../components/user/userService');

router.get('/user', async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

router.get('/user/:id', isLoggedIn, async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
});

router.put('/user/:id', isLoggedIn, async (req, res) => {
    const {
        name,
        phone,
        password,
        photoPath,
        address
    } = req.body;
    const user = await userService.editUser(
        req.params.id,
        name,
        phone,
        password,
        photoPath,
        address
    );
    res.json(user);
});

router.put('/user/recruiter/:id', isLoggedIn, async (req, res) => {
    const { bio } = req.body;
    const user = await userService.editRecruiter(req.params.id, bio);
    res.json(user);
});

router.put('/user/freelancer/:id', isLoggedIn, async (req, res) => {
    const { bio, skills, rating } = req.body;
    const user = await userService.editFreelancer(req.params.id, bio, skills, rating);
    res.json(user);
});

router.delete('/user/:id', isLoggedIn, async (req, res) => {
    const userDeleted = await userService.deleteUser(req.params.id);
    res.json(userDeleted);
});

module.exports = router;