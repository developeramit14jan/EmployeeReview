const mongoose = require('mongoose');
const admin = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    employeeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Employee`
    }],
    performance: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Performance`
    }]

}, { timeStamp: true });

const Admin = mongoose.model('admin', admin);
module.exports = Admin;