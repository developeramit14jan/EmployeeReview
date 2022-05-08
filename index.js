const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const port = 8000 || process.env.PORT;
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMware = require('./config/flashMessageMiddleware');
const app = express();
app.set('view engine' , 'ejs');
app.set('views' , './views')
const db = require(env.db_path);
const session = require('express-session');
const passport = require('passport');
const passportLocal = require(env.passport_local_path);

app.use(expressLayouts);

app.use(session({
    name : 'employeereview',
    secret :'employeereview',
    saveUninitialized : false,
    resave:false,
    cookie : {
        maxAge:(1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//now tell the app to use  static files
app.use(express.static(env.assets_path));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(flash());
app.use(customMware.setFlash)
app.use('/', require('./routes/index'));
app.listen(port, function (error) {
    if (error) {
        console.log("Error while creating server !!");
    } else {
        console.log("server is running !!");
    }
})