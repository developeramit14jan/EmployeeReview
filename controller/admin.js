const Employee = require('../models/employee');
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
        console.log("delete employee");
    } catch (error) {
        console.log("error");
    }
}

module.exports.updateEmployee = async function (req, res) {
    try {
        console.log("delete employee");
    } catch (error) {
        console.log("error");
    }
}

module.exports.viewEmployee = async function (req, res) {
    try {
        console.log('view employee');
    } catch (error) {
        console.log("error");
    }
}


// for performance review
module.exports.addReview = async function (req, res) {
    try {
        console.log("adding review");
    } catch (error) {
        console.log("error");
    }
}


module.exports.updatePerformance = async function (req, res) {
    try {
        console.log("update performance review");
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

