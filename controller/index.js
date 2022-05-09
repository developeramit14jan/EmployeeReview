const Employee = require('../models/employee');
const Admin = require('../models/admin');
// this is welcome page
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
            res.cookie('id', req.body.email );
            return res.redirect('/employee/perfromancelist');
        } else {
            req.flash('success', 'SignIn in successfully');
            res.cookie('id', req.body.email );
            return res.redirect('/admin_employee/employee_dashboard');

        }

    } catch (error) {
        req.flash('error' , 'Invalid username & password !!');
        return res.send("Login Password doesnot match");
    }
}


// make employee as  admin
module.exports.registerAdmin = async function (req, res) {
    try {
        console.log(req.body);
        const registerAdmin = await Admin.create(req.body);
        req.flash('success', 'Admin Registered successfully');
        return res.redirect('/admin_employee/employee_dashboard');
    } catch (error) {
        return res.send("Error during registation of admin !!");
    }
}

// destroy session
module.exports.destroySession = async function(req , res){
    req.logout();
    req.flash('success' , "Sign Out SuccessFully !!");
    return res.redirect('/');
}