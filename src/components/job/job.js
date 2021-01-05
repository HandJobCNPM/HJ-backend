const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware/auth/isLoggedIn');
const jobService = require('./jobService');
const userService = require('../user/userService');

router.get('/', async (req, res) => {
    const jobs = await jobService.getAllJobs();

    if (req.isAuthenticated()) {
        res.render('jobs', { role: "user", username: req.user.name, jobs })
    } else {
        res.render('jobs', { role: "guest", jobs })
    }

});

router.get('/:id', async (req, res) => {
    // const job = await jobService.getJobById(req.params.id);
    // res.json(job);
    if (req.isAuthenticated()) {
        res.render('detail', { role: "user", username: req.user.name })
    } else {
        res.render('detail', { role: "guest" })
    }
});

router.post('/', isLoggedIn, async (req, res) => {
    const {
        recruiterId,
        title,
        description,
        expiration,
        tags
    } = req.body;
    let newJob;

    if (recruiterId === req.user.id) {
        newJob = await jobService.createJob(
            recruiterId,
            title,
            description,
            expiration,
            tags
        );

        // update recruiter profile
        if (newJob) {
            userService.addJob(recruiterId, 'recruiter', newJob._id, title);
        }

    }
    res.json(newJob);
});

router.put('/:id', isLoggedIn, async (req, res) => {
    const job = await jobService.getJobById(req.params.id);
    if (job.recruiterId === req.user.id) {
        jobService.editJob(job._id, title, description, expiration, tags);
    }

    res.json(job);
});

router.delete('/:id', isLoggedIn, async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.id;
    const job = await jobService.getJobById(jobId);
    let jobDeleted;
    if (job.recruiterId === userId) {
        jobDeleted = jobService.deleteJob(jobId);

        if (jobDeleted) {
            // update recruiter profile
            userService.deleteJob(userId, 'recruiter', jobId);

            // update candidate profiles
            for (let candidate of job.comment) {
                userService.deleteJob(candidate.freelancerId, 'freelancer', jobId);
            }
        }
    }

    res.json(jobDeleted);
});

module.exports = router;
