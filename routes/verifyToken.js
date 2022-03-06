
const jwt = require('jsonwebtoken')

/*
module.exports = async function(req, res, next){
  const token = req.header("auth-token")
  
   if (!token) return res.status(400).json("Access denied , no token")
   try{
      const verified = await jwt.verify(token, process.env.SECRET)
      req.user = verified
      next()
   }catch(err){
      return res.status(400).json(err)
   }
 
}
*/

module.exports = async function(req, res, next){
    
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
    res.header('Access-Control-Allow-Credentials',true);
    
    var token = req.header("auth-token") 

   if (!token) return res.status(400).json("Access denied , no token")

   try{
      const verified = await jwt.verify(token, process.env.SECRET)
      req.user = verified
      next()
   }catch(err){
     console.log("token error :")
      return res.status(400).json('invalidtoken' + err)
   }
 
}