const mongoose = require('mongoose');
const employee = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            enum: ['employee', 'admin'],
            default: 'employee'
        },
        feedback :[{
            type : String
        }]
    }, { timestamps: true }
);
const Employee = mongoose.model('employee', employee);
module.exports = Employee;