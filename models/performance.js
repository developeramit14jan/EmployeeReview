const mongoose = require('mongoose');
const performance = mongoose.Schema({
    communication: {
        type: String,
        require: true
    },
    teamwork: {
        type: String,
        require: true
    },
    problemSolving: {
        type: String,
        require: true
    },
    accuracyOfWork: {
        type: String,
        require: true
    },
    attendance: {
        type: String,
        require: true
    },
    goalsAndMeetDeadlines: {
        type: String,
        require: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Employee`
    }
}, { timestamp: true });
const Performance = mongoose.model('performance', 'performance');
module.exports = Performance;