const mongoose = require('mongoose');

/*
{CONTRACT}
+job {title, description, salary, tags}
+recruiter link
+freelancer link
+agreement date (date)
+freelancer finished (boolean)
*/

let contractSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    recruiterId: {
        type: String,
        required: true
    },
    freelancerId: {
        type: String,
        required: true
    },
    acceptDate: {
        type: Date,
        required: true
    },
    finished: Boolean
});

module.exports = Contract = mongoose.model('Contract', contractSchema);
