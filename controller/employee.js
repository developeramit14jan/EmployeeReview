const Employee = require('../models/employee');
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
        console.log(allEmployee);
        res.render('employee', {
            title: "Employee",
            allEmployee: allEmployee
        });
    } catch (error) {
        return res.send("error in sending data");
    }
}

// module.exports.performanceReviewList = async function (req, res) {
//     try {
//         var allEmployee = await Employee.find({});
//         console.log(allEmployee);
//         return res.send("List!!");
//     } catch (error) {
//         return res.send("error");
//     }
// }

module.exports.submitFeedback = async function (req, res) {
    try {
        return res.redirect('/employee/perfromancelist');
        // return res.send(req.body);
    } catch (error) {
        return res.send("error");
    }
}
module.exports.feedbackPage = async function (req, res) {
    try {
        return res.render('submitFeedback', {
            title: "Feedback"
        });
    } catch (error) {
        return res.send("error in page");
    }
}