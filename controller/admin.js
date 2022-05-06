const Employee = require('../models/employee');
const Performance = require('../models/performance');
const Admin = require('../models/admin');
module.exports.addEmployeePage = async function (req, res) {
    var allEmployee = await Employee.find({});
    return res.render('adminEmployee', {
        title: "Admin Employee",
        allEmployee : allEmployee
    })
}
module.exports.addEmployee = async function (req, res) {
    try {
        const employeePresent = await Employee.find({ email: req.body.email });
        if (employeePresent.length > 0 && employeePresent) {
            return res.redirect('/admin_employee/employee_dashboard');
        } else {
            const employee = new Employee(req.body);
            const employeeRegister = await employee.save();
            return res.redirect('/admin_employee/employee_dashboard');
        }
    } catch (error) {
        return res.send("Error in adding employee by admin");
    }
}

module.exports.deleteEmployee = async function (req, res) {
    try {
        console.log("delete");
        console.log(req.body);
        var deletedEmployee = await Employee.findOneAndDelete({ email: req.body.email });
        console.log(deletedEmployee == null);
        if (deletedEmployee == null) {
            // return res.send("already Deleted !!");
            return res.redirect('/admin_employee/employee_dashboard');
        } else {
            // return res.send("deleted");
            return res.redirect('/admin_employee/employee_dashboard');
        }
    } catch (error) {
        return res.send("Error in deleting Employee");
    }
}

module.exports.updateEmployee = async function (req, res) {
    try {
        console.log("update employee");
        var updatedEmployee = await Employee.findOneAndUpdate(req.body);
        return res.redirect('/admin_employee/employee_dashboard');
    } catch (error) {
        return res.send("Error in updating Employee !!");
    }
}

//admin performance page
module.exports.adminPerformancePage = async function(req , res){
    try{
        const loginAdmin = await Admin.find({});
        const performanceArray = loginAdmin[0].performance;
        const list =[];
        for(var i = 0 ; i<performanceArray.length ; i++ ){
            const data =   await Performance.findById(performanceArray[i]).populate('employees');
            list.push(data);
        }
        return res.render('adminPerformance' , {
            title : "AdminPerformancePage",
            list:list
        })
    }catch(error){
        return res.send("error");
    }
}


// assign employee to participate in feedback
module.exports.assignEmployee = async function (req, res) {
    try {
        const forEmployee = await Employee.find({ email: req.body.fromEmployeeEmail });
        const assignFeedback = await Employee.find({ email: req.body.toEmployeeEmail });
        assignFeedback[0].feedback.push(forEmployee[0]._id.toString());
        await assignFeedback[0].save();
        return res.redirect('back');
    } catch (error) {
        return res.send("Error while Assigning Employee");
    }
}