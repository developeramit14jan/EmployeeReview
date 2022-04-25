module.exports.register = async function(req , res){
    try{
        return res.send(req.body);
    }catch(error){
        return res.send(error);
    }
}

module.exports.performanceReviewList = async function (req , res){
    try{
        return res.send("List!!");
    }catch(error){
        return res.send("error");
    }
}

module.exports.submitFeedback = async function(req, res){
    try{
        return res.send(req.body);
    }catch(error){
        return res.send("error");
    }
}