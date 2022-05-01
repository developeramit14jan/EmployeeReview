const express = require('express');
const port = 8000 || process.env.PORT;
const app = express();
app.set('view engine' , 'ejs');
app.set('views' , './views')
const db = require('./config/mongoose');
app.use(express.urlencoded({extended :true}));
app.use('/', require('./routes/index'));
app.listen(port, function (error) {
    if (error) {
        console.log("Error while creating server !!");
    } else {
        console.log("server is running !!");
    }
})