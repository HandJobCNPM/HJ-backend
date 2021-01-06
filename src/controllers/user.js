const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');
const { isCurUser } = require('../middleware/auth/verifyUser');
const userService = require('../components/user/userService');
const { resize, upload } = require('../middleware/image/image')

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
        res.render('profile', { role: "own", username: req.user.name, id: req.user._id, user, photoPath: req.user.photoPath })
    } else {
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

router.post('/upload-image', upload.single('image'), async (req, res) => {
    if (!req.file) {
        res.render('404')
    } else {
        if (req.isAuthenticated()) {
            const imageName = req.user._id
            resize(imageName, req.file.buffer)

            await userService.uploadImage(imageName, `/images/${imageName}.webp`)
        }
        res.redirect('/user')
    }
})

module.exports = router;