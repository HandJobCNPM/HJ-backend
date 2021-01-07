const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');
const contractService = require('../components/contract/contractService');

router.post('/', isLoggedIn, (req, res) => {
    const { jobId, title, salary, recruiterId, freelancerId, recruiterName, freelancerName, description } = req.body

    contractService.createContract(jobId, title, salary, recruiterId, freelancerId, recruiterName, freelancerName, description)
    res.redirect('/job')
})

router.get('/:id', isLoggedIn, async (req, res) => {
    const contractId = req.params.id
    const contract = await contractService.getContractById(contractId)

    if (contract.recruiterId == req.user._id || contract.freelancerId == req.user._id) {
        res.render('contract', { role: "user", username: req.user.name, id: req.user._id, photoPath: req.user.photoPath, contract })
    } else {
        res.render('404')
    }
})

router.put('/:id', isLoggedIn, async (req, res) => {
    const contractId = req.params.id
    const contract = await contractService.getContractById(contractId)

    if (contract.recruiterId == req.user._id) {
        contractService.finishContract(contractId)
        res.redirect('/contract/' + contractId)
    } else {
        res.render('404')
    }
})

module.exports = router;