const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');
const contractService = require('../components/contract/contractService');

router.post('/', isLoggedIn, (req, res) => {
    const { jobId, title, salary, recruiterId, freelancerId } = req.body

    contractService.createContract(jobId, title, salary, recruiterId, freelancerId)
    res.redirect('/job')
})

module.exports = router;