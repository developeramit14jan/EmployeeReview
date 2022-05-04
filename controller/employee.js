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
        console.log(req.body)
        var presentEmployee = await Employee.find({ email: req.body.email });
        if (presentEmployee.email === req.body.email) {
            console.log("Amit")
            return res.redirect('/');
        } else {
            const registerEmployee = new Employee(req.body);
            const resistered = await registerEmployee.save();
            console.log(resistered.id);
            var allAdmin = await Admin.find({});
            for (var i = 0; i < allAdmin.length; i++) {
                allAdmin[i].employeeId.push(resistered.id);
                allAdmin[i].save();
            }
            console.log(allAdmin[0].employeeId);

            // return res.redirect('/');
            return res.redirect('/');
            // return res.send("registered");
        }
    } catch (error) {
        return res.send(error);
    }
}
module.exports.performanceReviewList = async function (req, res) {
    try {
        var allEmployee = await Employee.find({});

        var like = false;
        res.render('employee', {
            title: "Employee",
            allEmployee: allEmployee,
            like: like
        });
    } catch (error) {
        return res.send("error in sending data");
    }
}



module.exports.submitFeedback = async function (req, res) {
    try {
        like = true;
        // var performancePresent = await Performance.find({ employeeId: req.body.employeeId });
        // if (!performancePresent) {
        var addPerformance = await Performance(req.body);
        addPerformance.save();
        console.log("akaka",req.body.employeeId);
        // find employee by id 
        const employeeById = await Employee.findById(req.body.employeeId);
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