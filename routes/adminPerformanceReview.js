const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');
const adminAction = require('../controller/adminAction');
router.get('/dashBoard' , admin.adminPerformancePage);
router.get('/:id', adminAction.adminPerformanceAddPage);
router.post('/add_review' , adminAction.addReview);
module.exports = router;
