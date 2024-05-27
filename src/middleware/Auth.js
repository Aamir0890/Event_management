const User=require('../models/User')
const jwt=require('jsonwebtoken')
require('dotenv').config();

const authMiddleware=async(req,res,next)=>{
    const token=req.header('Authorization').replace("Bearer ","")
    // console.log(token)
    try {
        const decode=jwt.verify(token,process.env.SECRET_KEY);
   
        const user=await User.findOne({email:decode.id.email})
        if(!user){
            throw new Error();
        }
        req.user=user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid Token' });
    }
}

const AdminAuth=async (req,res,next)=>{
    if(req.user.role!=='admin'){
        return res.status(403).send({ error: 'Access denied. Admins only.' });
    }
    next();

}


module.exports={AdminAuth,authMiddleware}