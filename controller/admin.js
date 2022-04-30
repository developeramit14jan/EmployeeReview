const Employee = require('../models/employee');
const Performance = require('../models/performance');
module.exports.addEmployee = async function (req, res) {
    try {
        const employeePresent = await Employee.find({ email: req.body.email });
        if (employeePresent.length > 0 && employeePresent) {
            return res.send(employeePresent);
        } else {
            const employee = new Employee(req.body);
            const employeeRegister = await employee.save();
            return res.send(employeeRegister);

        }
    } catch (error) {
        return res.send("Error in adding employee by admin");
    }
}

module.exports.deleteEmployee = async function (req, res) {
    try {
        console.log("delete");
        console.log(req.body);
        var deletedEmployee = await Employee.findOneAndDelete({email :req.body.email});
        console.log(deletedEmployee== null);
        if(deletedEmployee== null){
            return res.send("already Deleted !!");
        }else{
            return res.send("deleted");
        }
    } catch (error) {
        return res.send("Error in deleting Employee");
    }
}

module.exports.updateEmployee = async function (req, res) {
    try {
        console.log("update employee");
        // var updatedEmployee = await Employee.findOneAndUpdate(req.body);
        // return res.send(updatedEmployee);
        
        Employee.findOne({email : req.body.email} , function(error , updateEmployee){
            if(error){
                return res.send("error");
            }else{
                updateEmployee.name = req.body.name;
                updateEmployee.password = req.body.password;
                updateEmployee.save();
                return res.send(updateEmployee);
            }
        })
    } catch (error) {
        return res.send("Error in updating Employee !!");
    }
}

module.exports.viewEmployee = async function (req, res) {
    try {
        // here we have to pass id \
        var viewEmployee = await Employee.findById(req.params.id);
        if(!viewEmployee){
            return res.send("employee Not find !!");
        }else{
            return res.send(viewEmployee);
        }
    } catch (error) {
        return res.send("error in finding employee");
    }
}


// for performance review
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

