var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Employee = require('../models/employee');
var Admin = require('../models/admin');
// const req = require('express/lib/request');


let passportCallback = async function(req, email, password, done){
    //find user and establish identity..
    console.log(email , password);
    try{
    let loginEmployee = await Employee.findOne({email: email})
    console.log(loginEmployee);
        if(!loginEmployee || loginEmployee.password != password)
        {
            return done(null, false);
        }
        return done(null, loginEmployee);
    }
    catch(err)
    {
        return done(err);
    }
}
passport.use(new LocalStrategy(passportCallback));
passport.serializeUser(function(loginEmployee, done) {
    done(null, loginEmployee[0].email);
  });

  let deserializeCallback = async function(email, done){
    try{
    let employee= await Employee.find({email : email});
    return done(null, employee);
    }
    catch(err){
        return done(err);
    }
}
  passport.deserializeUser(deserializeCallback);

module.exports = passport;