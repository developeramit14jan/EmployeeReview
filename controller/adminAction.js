const Performance = require('../models/performance');
const Employee = require('../models/employee');
const Admin = require('../models/admin');
module.exports.adminPerformanceAddPage = async function(req , res){
    return res.render('adminPerformanceAction' , {
        title : "Add & Update Feedback",
        id : req.params.id
    })
}

module.exports.addReview = async  function (req, res) {
    try {
        // add performance and save it
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
        return res.redirect('/admin_performance/dashBoard');
    } catch (error) {
        return res.send('error');
    }
}


 

// module.exports.updatePerformance = async function (req, res) {
//     try {
//         console.log("u");
//     } catch (error) {
//         console.log("error");
//     }
// }
