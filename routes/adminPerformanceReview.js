const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');
router.post('/add_review' , admin.addReview);
router.get('/dashBoard' , admin.adminPerformancePage);
module.exports = router;
