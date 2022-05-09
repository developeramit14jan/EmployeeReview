const Employee = require('../models/employee');
const Performance = require('../models/performance');
const Admin = require('../models/admin');
module.exports.addEmployeePage = async function (req, res) {
    // find all employee 
    var allEmployee = await Employee.find({});
    return res.render('adminEmployee', {
        title: "Admin Employee",
        allEmployee: allEmployee
    })
}
module.exports.addEmployee = async function (req, res) {
    try {
        const employeePresent = await Employee.find({ email: req.body.email });
        if (employeePresent.length > 0 && employeePresent) {
            req.flash('error', 'Already Added !!');
            return res.redirect('/admin_employee/employee_dashboard');
        } else {
            const addemployee = new Employee(req.body);
            await addemployee.save();
            req.flash('success', 'Employee added successfully !!');
            return res.redirect('/admin_employee/employee_dashboard');
        }
    } catch (error) {
        return res.send("Error in adding employee by admin");
    }
}

module.exports.deleteEmployee = async function (req, res) {
    try {
        var deletedEmployee = await Employee.findOne({ email: req.body.email });
        if (!deletedEmployee) {
            req.flash('error', 'Already Deleted !')
            return res.redirect('/admin_employee/employee_dashboard');
        } else {
            console.log(deletedEmployee.feedback);
            console.log(deletedEmployee.performances);
            if (deletedEmployee.feedback.length > 0) {
                for (var i = 0; i < deletedEmployee.feedback.length; i++) {
                    await Performance.findOneAndDelete({ id: deletedEmployee.feedback[i] });
                }
            }
            var adminpart = await Admin.findOne({ email: req.cookies.id });
            adminpart.employeeId.splice(adminpart.employeeId.indexOf(deletedEmployee.id), 1);
            adminpart.performance.splice(adminpart.performance.indexOf(deletedEmployee.performances), 1);
            adminpart.save();
            await Employee.findOneAndDelete({ email: req.body.email });
            req.flash('success', 'Deleted Success fully !!');
            return res.redirect('/admin_employee/employee_dashboard');
        }
    } catch (error) {
        return res.send("Error in deleting Employee");
    }
}

module.exports.updateEmployee = async function (req, res) {
    try {
        var updatedEmployee = await Employee.findOneAndUpdate(req.body);
        req.flash('success', 'Updated Success fully !!');
        return res.redirect('/admin_employee/employee_dashboard');
    } catch (error) {
        req.flash('error', 'Error while Updating !!');
        return res.send("Error in updating Employee !!");
    }
}

//admin performance page
module.exports.adminPerformancePage = async function (req, res) {
    try {
        const loginAdmin = await Admin.findOne({ email: req.cookies.id });
        const performanceArray = loginAdmin.performance;
        const list = [];
        for (var i = 0; i < performanceArray.length; i++) {
            const data = await Performance.findById(performanceArray[i]).populate('employees');
            if (data != null) {
                list.push(data);
            } else {
                break;
            }
        }
        return res.render('adminPerformance', {
            title: "AdminPerformancePage",
            list: list
        })
    } catch (error) {
        return res.send("error in admin performance panal !");
    }
}


// assign employee to participate in feedback
module.exports.assignEmployee = async function (req, res) {
    try {
        const forEmployee = await Employee.find({ email: req.body.fromEmployeeEmail });
        const assignFeedback = await Employee.find({ email: req.body.toEmployeeEmail });
        assignFeedback[0].feedback.push(forEmployee[0]._id.toString());
        await assignFeedback[0].save();
        req.flash('success', 'Employee Assign Success fully !!');
        return res.redirect('back');
    } catch (error) {
        return res.send("Error while Assigning Employee");
    }
}