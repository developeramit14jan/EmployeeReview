const express = require('express');
const router = express.Router();
const index = require('../controller/index');
router.get('/', index.welcome);
router.get('/login' , index.Login);
router.use('/employee' , require('./employee'));
console.log('router of admin is running ');
module.exports = router;