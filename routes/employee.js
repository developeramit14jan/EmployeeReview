const express = require('express');
const router = express.Router();
const employee = require('../controller/employee');
router.post('/register' , employee.register);
router.get('/signUp' , employee.signup);
router.get('/perfromancelist' , employee.performanceReviewList);
router.get('/:id' , employee.feedbackPage);
router.post('/feedback',employee.submitFeedback);
module.exports = router;