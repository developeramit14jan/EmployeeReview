
module.exports.welcome = async function(req , res){
    return res.send("Welcome !!");
}

module.exports.Login = async function(req , res){
    try{
        console.log(req.body);

        return res.send("Login Success Full ||");
    }catch(error){
        console.log(error);
        return res.send("Login Password doesnot match")
    }
}