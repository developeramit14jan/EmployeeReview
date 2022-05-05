const Employee = require('../models/employee');
const Admin = require('../models/admin');
module.exports.welcome = async function (req, res) {
    res.render('signIn', {
        title: "Sign In"
    });
}

// login for employee and admin
module.exports.LoginEmployee = async function (req, res) {
    try {
        if (req.body.role == "employee") {
            const loginEmployee = await Employee.find({ email: req.body.email });
            console.log(loginEmployee.email);
            if (loginEmployee[0].email === req.body.email && loginEmployee[0].password === req.body.password) {
                return res.redirect('/employee/perfromancelist');
            } else {
                return res.redirect('back');
            }
        } else {
            console.log("admin login");
            const loginAdmin = await Admin.find({ email: req.body.email });
            if (loginAdmin.email === req.body.email && loginAdmin.password === req.body.password) {
                return res.redirect('/admin_employee/employee_dashboard');
            } else {
                return res.redirect('back');
            }
        }

    } catch (error) {
        console.log(error);
        return res.send("Login Password doesnot match");
    }
}


// make employee as  admin
module.exports.registerAdmin = async function (req , res){
    try{
        const registerAdmin = new Admin(req.body);
        const register = await registerAdmin.save();
        return res.redirect('/admin_employee/employee_dashboard');
    }catch(error){
        return res.send("error");
    }
}