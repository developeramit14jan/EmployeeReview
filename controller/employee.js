const Employee = require('../models/employee');
const Admin = require('../models/admin');
const env = require('../config/environment');
const Performance = require('../models/performance');
module.exports.signup = async function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/employee/perfromancelist');
    }
    res.render('signUp', {
        title: "Sign Up"
    });
}

module.exports.register = async function (req, res) {
    try {
        var presentEmployee = await Employee.find({ email: req.body.email });
        if (presentEmployee.email === req.body.email) {
            return res.redirect('/');
        } else {
            const registerEmployee = new Employee(req.body);
            const resistered = await registerEmployee.save();
            var allAdmin = await Admin.find({});
            for (var i = 0; i < allAdmin.length; i++) {
                allAdmin[i].employeeId.push(resistered.id);
                allAdmin[i].save();
            }
            return res.redirect('/');
        }
    } catch (error) {
        return res.send(error);
    }
}
module.exports.performanceReviewList = async function (req, res) {
    try {
        var allEmployee = await Employee.findById(req.cookies.id);
        var feedback = allEmployee.feedback;
        var list = [];
        for (var i = 0; i < feedback.length; i++) {
            const data = await Employee.findById(feedback[i]).populate();
            list.push(data);
        }
        res.render('employeeDashboard', {
            title: "Employee",
            allEmployee: list
        });
    } catch (error) {
        return res.send("error in sending data");
    }
}



module.exports.submitFeedback = async function (req, res) {
    try {
        var addPerformance = await Performance(req.body);
        addPerformance.save();
        console.log("akaka", req.body);
        // find employee by id 
        const employeeById = await Employee.findById(req.body.employees);
        employeeById.like = true;
        // console.log(employeeById);
        employeeById.performances = addPerformance.id;
        await employeeById.save();
        // console.log(employeeById);
        // const data = employeeById.populate('');
        // console.log("problem");
        //    const data =  await employeeById.populate('performances');

        //     console.log(data);
        const allAdmin = await Admin.find({});
        console.log(addPerformance._id);
        // console.log(allAdmin);
        for (var i = 0; i < allAdmin.length; i++) {
            allAdmin[i].performance.push(addPerformance.id);
            allAdmin[i].save();
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