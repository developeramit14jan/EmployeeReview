const Employee = require('../models/employee');
const Admin = require('../models/admin');
const Performance = require('../models/performance');
module.exports.adminPerformanceAddPage = async function (req, res) {
    return res.render('adminPerformanceAction', {
        title: "Add & Update Feedback",
        id: req.params.id
    })
}

module.exports.addReview = async function (req, res) {
    try {
        // add performance and save it
        const performancePresent = await Performance.findOne({ employees: req.body.employees });
        if (performancePresent) {
            req.flash('error', 'FeedBack Already Added !!');
        } else {
            var addPerformance = await Performance(req.body);
            await addPerformance.save();
            // add to employee
            const employeeById = await Employee.findById(req.body.employees);
            employeeById.performances = addPerformance.id;
            employeeById.save();
            // add to admin
            const allAdmin = await Admin.find({});
            for (var i = 0; i < allAdmin.length; i++) {
                allAdmin[i].performance.push(addPerformance.id);
                allAdmin[i].save();
            }
        }
        return res.redirect('/admin_performance/dashBoard');
    } catch (error) {
        return res.send("Error in adding feedback");
    }
}


module.exports.updateFeedback = async function (req, res) {
    try {
        const updatePerformance = await Performance.findOne({ employees: req.body.employees });;
        updatePerformance.problemSolving = req.body.problemSolving;
        updatePerformance.teamwork = req.body.teamwork;
        updatePerformance.communication = req.body.communication;
        updatePerformance.accuracyOfWork = req.body.accuracyOfWork;
        updatePerformance.attendance = req.body.attendance;
        await updatePerformance.save();
        req.flash('success', "Feedback Updated SuccessFully !!");
        return res.redirect('/admin_performance/dashBoard');
    } catch (error) {
        return res.flash('error', "Error in updating Feedback !! ");
    }
}

