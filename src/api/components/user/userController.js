const express = require('express');
const router = express.Router();
const authenticate = require('../../../middleware/auth/authenticate');
const service = require('./userService');

router.get('/user/:id', authenticate, async (req, res) => {
    const resData = await service.getUser(req.params.id);
    if (!resData.hasOwnProperty('_error')) {
        res.status(200).json(resData);
        return;
    }
    res.status(404).json(resData);
});

module.exports = router;