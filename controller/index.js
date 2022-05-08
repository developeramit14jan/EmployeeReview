const Employee = require('../models/employee');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const evn = require('../config/environment');
const { sign } = require('jsonwebtoken');
module.exports.welcome = async function (req, res) {
    res.render('signIn', {
        title: "Sign In"
    });
}

// login for employee and admin
module.exports.LoginEmployee = async function (req, res) {
    try {
        // return res.redirect('/')
        if (req.body.role == "employee") {
            const loginEmployee = await Employee.find({ email: req.body.email });
            // console.log(loginEmployee[0].email);
            const token = jwt.sign(loginEmployee[0].email, evn.secret_key);
            if (loginEmployee[0].email === req.body.email && loginEmployee[0].password === req.body.password) {
                // writting inside cookies
                res.cookie('employee_email', token,{ expires: new Date(new Date().getTime()+5*60*1000), httpOnly: true } );
                return res.redirect('/employee/perfromancelist');
            } else {
                return res.redirect('back');
            }
        } else {
            console.log("admin login");
            const loginAdmin = await Admin.find({ email: req.body.email });
            const token = jwt.sign(loginAdmin[0].email, "evm");
            // console.log(loginAdmin)
            if (loginAdmin[0].email == req.body.email && loginAdmin[0].password == req.body.password) {
                res.cookie('admin_email', token , { expires: new Date(new Date().getTime()+5*60*1000), httpOnly: true });
                return res.redirect('/admin_employee/employee_dashboard');
            } else {
                return res.redirect('back');
            }
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