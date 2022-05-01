const Employee = require('../models/employee');
const Admin = require('../models/admin');
const Performance = require('../models/performance');
module.exports.signup = async function (req, res) {
    res.render('home', {
        title: "Sign Up"
    });
}

module.exports.register = async function (req, res) {
    try {
        var presentEmployee = await Employee.findOne({ email: req.body.email });
        if (presentEmployee) {
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
        var allEmployee = await Employee.find({});
        res.render('employee', {
            title: "Employee",
            allEmployee: allEmployee
        });
    } catch (error) {
        return res.send("error in sending data");
    }
}



module.exports.submitFeedback = async function (req, res) {
    try {
        var performancePresent = await Performance.find({ employeeId: req.body.employeeId });
        if (!performancePresent) {
            var addPerformance = await Performance(req.body);
            addPerformance.save();
        }
        return res.redirect('/employee/perfromancelist');
    } catch (error) {
        return res.send("error");
    }
}
module.exports.feedbackPage = async function (req, res) {
    try {
        console.log(req.params.id)
        return res.render('submitFeedback', {
            title: "Feedback",
            id: req.params.id
        });
    } catch (error) {
        return res.send("error in page");
    }
}