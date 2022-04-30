const Employee = require('../models/employee');
module.exports.welcome = async function (req, res) {
    res.render('employeeLogin', {
        title: "Sign In"
    });
}

module.exports.LoginEmployee = async function (req, res) {
    try {
        const loginEmployee = await Employee.find({ email: req.body.email });
        if (loginEmployee.length != 0 && loginEmployee) {
            return res.redirect('/employee/list');
        } else {
            return res.send("Login Password doesnot match");
        }

    } catch (error) {
        console.log(error);
        return res.send("Login Password doesnot match");
    }
}