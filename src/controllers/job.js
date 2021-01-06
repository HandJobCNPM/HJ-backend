const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth/isLoggedIn');
const jobService = require('../components/job/jobService');
const userService = require('../components/user/userService');

router.get('/', async (req, res) => {
    const jobs = await jobService.getAllJobs();

    if (req.isAuthenticated()) {
        res.render('jobs', { role: "user", username: req.user.name, id: req.user._id, jobs, query: "" })
    } else {
        res.render('jobs', { role: "guest", jobs, query: "" })
    }

});

router.get('/:id', async (req, res) => {
    const job = await jobService.getJobById(req.params.id);

    if (req.isAuthenticated()) {
        res.render('detail', { role: "user", username: req.user.name, id: req.user._id, job })
    } else {
        res.render('detail', { role: "guest", job })
    }
});

router.post('/', isLoggedIn, async (req, res) => {
    const {
        recruiterId,
        recruiterName,
        title,
        description,
        expiration,
        tags,
        paidMin,
        paidMax
    } = req.body;
    let newJob;

    if (recruiterId == req.user._id) {
        newJob = await jobService.createJob(
            recruiterId,
            recruiterName,
            title,
            description,
            expiration,
            tags,
            paidMin,
            paidMax
        );

        // update recruiter profile
        if (newJob) {
            userService.addJob(recruiterId, 'recruiter', newJob._id, title);
        }
    }

    res.redirect('/job')
});

router.put('/:id', isLoggedIn, async (req, res) => {
    const {
        title,
        description,
        expiration,
        tags,
        paidMin,
        paidMax
    } = req.body;

    const job = await jobService.getJobById(req.params.id);
    if (job.recruiterId === req.user.id) {
        jobService.editJob(job._id, title, description, expiration, tags, paidMin, paidMax);
    }

    res.redirect(`/job/${job._id}`)
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

router.post('/comment/:id', isLoggedIn, async (req, res) => {
    const jobId = req.params.id;
    const freelancerId = req.user._id;
    const freelancerName = req.user.name;

    const { bid, applyReason } = req.body;

    const job = await jobService.getJobById(jobId);
    if (job.recruiterId !== freelancerId) {
        jobService.appendComment(jobId, freelancerId, freelancerName, bid, applyReason);
    }

    res.redirect(`/job/${jobId}`)
})

router.post('/search', async (req, res) => {
    const { query } = req.body
    const encodeQuery = encodeURI(query)

    res.redirect('/job/search/' + encodeQuery)
})

router.get('/search/:id', async (req, res) => {
    const query = req.params.id

    let results = await jobService.searchJob(query)

    if (req.isAuthenticated()) {
        res.render('jobs', { role: "user", username: req.user.name, id: req.user._id, jobs: results, query })
    } else {
        res.render('jobs', { role: "guest", jobs: results, query })
    }
})

module.exports = router;
