const Employee = require('../models/employee');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const evn = require('../config/environment');
module.exports.welcome = async function (req, res) {
    res.render('signIn', {
        title: "Sign In"
    });
}

// login for employee and admin
module.exports.LoginEmployee = async function (req, res) {
    try {
        if (req.body.role == "employee") {
            req.flash('success', 'SignIn in successfully');
            return res.redirect('/employee/perfromancelist');
        } else {
            req.flash('success', 'SignIn in successfully');
            return res.redirect('/admin_employee/employee_dashboard');

        }

    } catch (error) {
        console.log(error);
        return res.send("Login Password doesnot match");
    }
}


// make employee as  admin
module.exports.registerAdmin = async function (req, res) {
    try {
        const registerAdmin = new Admin(req.body);
        const register = await registerAdmin.save();
        return res.redirect('/admin_employee/employee_dashboard');
    } catch (error) {
        return res.send("error");
    }
}