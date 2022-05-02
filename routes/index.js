const express = require('express');
const router = express.Router();
const index = require('../controller/index');
router.get('/', index.welcome);
router.post('/login' , index.LoginEmployee);
router.post('/register', index.registerAdmin);// to be deleted
router.use('/employee' , require('./employee'));
router.use('/admin_employee' ,require('./adminEmployee'));
router.use('/admin_performance' , require('./adminPerformanceReview'));
module.exports = router;