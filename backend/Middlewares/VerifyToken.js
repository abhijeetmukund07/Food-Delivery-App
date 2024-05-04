const jwt = require('jsonwebtoken')
require('dotenv').config()

const VerifyToken = (req,res,next)=>{
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        return res.send({message:'Not Authorized. Please Login Again',statusCode : 25});
    }else{
        let token = bearerToken.split(' ')[1]
        try{
            let decodedToken = jwt.decode(token,process.env.SECRET_KEY)
            console.log(decodedToken)
            req.body.username = decodedToken.username
            if (decodedToken.restaurantId) {
                req.body.restaurantId = decodedToken.restaurantId;
            }
            if (decodedToken.restaurantName) {
                req.body.restaurantName = decodedToken.restaurantId;
            }
            next()
        }catch(err){
            next(err)
        }
    }
}

module.exports = VerifyToken