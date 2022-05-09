const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const port = 8000 || process.env.PORT;
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMware = require('./config/flashMessageMiddleware');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views')
const db = require(env.db_path);
const session = require('express-session');
const passport = require('passport');
const passportLocal = require(env.passport_local_path);
const MongoStore = require('connect-mongo');

app.use(expressLayouts);

app.use(session({
    name: 'employeereview',
    secret: 'employeereview',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongoUrl :'mongodb://localhost:27017/employee_Review',
        autoRemve:'interval',
        autoRemoveInterval:'1'
    }),fumction(error){
        console.log(err || 'connect-mongo setup ok')
    }
}));

app.use(passport.initialize());
app.use(passport.session());
//now tell the app to use  static files
app.use(express.static(env.assets_path));
app.use(express.urlencoded());
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