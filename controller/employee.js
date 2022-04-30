const Employee = require('../models/employee');
const Performance = require('../models/performance');
module.exports.signup = async function (req, res) {
    res.render('home', {
        title: "Sign Up"
    });
}
module.exports.employee = async function(req, res){
    res.render('employee', {
        title : "Employee"
    })
}
module.exports.register = async function (req, res) {
    try {
        var presentEmployee = await Employee.findOne({ email: req.body.email });
        if (presentEmployee.length > 0 && presentEmployee) {
            return res.redirect('/');
        } else {
            const registerEmployee = new Employee(req.body);
            const resistered = await registerEmployee.save();
            return res.redirect('/');

        }
    } catch (error) {
        return res.send(error);
    }
}


module.exports.performanceReviewList = async function (req, res) {
    try {
        return res.send("List!!");

    } catch (error) {
        return res.send("error");
    }
}

module.exports.submitFeedback = async function (req, res) {
    try {
        return res.send(req.body);
    } catch (error) {
        return res.send("error");
    }
}