const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');
const jobService = require('../components/job/jobService');
const userService = require('../components/user/userService');

router.get('/job', async (req, res) => {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
});

router.get('/job/:id', async (req, res) => {
    const job = await jobService.getJobById(req.params.id);
    res.json(job);
});

router.post('/job', isLoggedIn, async (req, res) => {
    const {
        recruiterId,
        title,
        description,
        expiration,
        tags
    } = req.body;

    const newJob = await jobService.createJob(
        recruiterId,
        title,
        description,
        expiration,
        tags
    );

    // update user profile
    let user;
    if (newJob) {
        user = await userService.addPostedJob(recruiterId, newJob._id, title);
    }
    res.json(newJob && user);
});

// router.put('/job/:id', isLoggedIn, async (req, res) => {
//     const job = await jobService.getJobById(req.params.id);
//     if (job) {
//         jobService.editJob(job._id, title, description, expiration, tags);
//     }

//     res.json(job);
// });

module.exports = router;
