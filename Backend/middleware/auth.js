const JWT=require('jsonwebtoken')


const authenticateToken=function(req,res){
    if(req.headers.authorization){
        console.log(req.headers.authorization)
    }
}


module.exports=authenticateToken;