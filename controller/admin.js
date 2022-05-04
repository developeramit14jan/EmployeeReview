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
            // return res.send(employeeRegister);
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
        // return res.send(updatedEmployee);
        return res.redirect('/admin_employee/employee_dashboard');
    } catch (error) {
        return res.send("Error in updating Employee !!");
    }
}

module.exports.viewEmployee = async function (req, res) {
    try {
        // here we have to pass id \
        var viewEmployee = await Employee.findOne(req.body);
        if (!viewEmployee) {
            return res.send("employee Not find !!");
        } else {
            return res.send(viewEmployee);
        }
    } catch (error) {
        return res.send("error in finding employee");
    }
}


// for performance review



//admin performance page
module.exports.adminPerformancePage = async function(req , res){
    try{
        const loginAdmin = await Admin.find({email : 'kumar.amit14jan@gmail.com'});
        // loginAdmin.performa.populate('Performance')
        // 
        const performanceArray = loginAdmin[0].performance;
        const list =[];
        for(var i = 0 ; i<performanceArray.length ; i++ ){
            const data =   await Performance.findById(performanceArray[i]).populate('employees');
            list.push(data);
        }
      
     console.log("Amit",list);
     console.log(list[0].employees.id)
        return res.render('adminPerformance' , {
            title : "AdminPerformancePage",
            list:list
        })
    }catch(error){
        return res.send("error");
    }
}
module.exports.addReview = async function (req, res) {
    try {

        console.log("addReview");
    } catch (error) {
        console.log("error");
    }
}


module.exports.updatePerformance = async function (req, res) {
    try {
        console.log("u");
    } catch (error) {
        console.log("error");
    }
}

module.exports.viewPerformance = async function (req, res) {
    try {
        console.log("view performance");
    } catch (error) {
        console.log("error");
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
        return res.send("error");
    }
}