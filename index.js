const express = require('express');
const port = 8000 || process.env.PORT;
const expressLayouts = require('express-ejs-layouts');
const app = express();
app.set('view engine' , 'ejs');
app.set('views' , './views')
const db = require('./config/mongoose');
app.use(expressLayouts);
//now tell the app to use  static files
app.use(express.static('./assets'));
app.use(express.urlencoded({extended :true}));
app.use('/', require('./routes/index'));
app.listen(port, function (error) {
    if (error) {
        console.log("Error while creating server !!");
    } else {
        console.log("server is running !!");
    }
})