const jwt= require('jsonwebtoken');
require('dotenv').config();

const verifyToken= (req, res, next)=>{
    const token= req.headers.authorization;

    if(!token){
        res.status(401).json({message: 'No Token, Access Denied'})
    }
    try {
        const decode= jwt.verify(token, process.env.SecretKey);
        req.user= decode;
        next();
        
    } catch (error) {
        res.status(400).json({message: 'Invalid Token'})
    }
}

module.exports= verifyToken