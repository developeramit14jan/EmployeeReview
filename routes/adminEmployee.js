const express =require('express');
const router = express.Router();
const admin = require('../controller/admin');
router.post('/add_employee' , admin.addEmployee);
router.delete('/delete_employee' , admin.deleteEmployee);
router.patch('/update_employee' , admin.updateEmployee);
router.get('/:id', admin.viewEmployee);
module.exports = router;