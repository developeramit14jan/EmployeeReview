const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');
router.post('/add_review' , admin.addReview);
module.exports = router;
