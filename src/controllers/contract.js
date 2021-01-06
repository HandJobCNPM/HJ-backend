const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');
const contractService = require('../components/contract/contractService');

router.post('/:id', isLoggedIn, (req, res) => {
    const jobId = req.params.id
    const { salary, recruiterId, freelancerId } = req.body

    contractService.createContract(salary, recruiterId, freelancerId)
    res.redirect('/job/' + jobId)
})