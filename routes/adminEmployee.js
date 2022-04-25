const express =require('express');
const router = express.Router();
const admin = require('../controller/admin');
router.post('/addEmployee' , admin.addEmployee);
router.delete('/delete' , admin.deleteEmployee);
router.patch('/update' , admin.updateEmployee);
router.get('/view', admin.viewEmployee);
module.exports = router;