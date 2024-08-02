const User= require('../models/UserModel');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const verifyToken = require('../middleware/authMiddlware');

// register
const register= async(req,res)=>{
    try {
        const {username, email, password}= req.body;
        const userExist= await User.findOne({email});

        if(userExist){
           return res.status(400).json({message: 'user already exist'});
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser= new User({
            username,
            email, 
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: 'user registerd successsfully', newUser});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

// login
const login= async(req,res)=>{
    try {
        const {username, email, password}= req.body;
        const userExist= await User.findOne({email});

        if(!userExist){
           return res.status(400).json({message: 'Invalid Credentials (email)'});
        }

        const isMatch= await bcrypt.compare(password, userExist.password);
        if(!isMatch){
           return  res.status(400).json({message: 'Inavlid Credentials (password)'});
        }

        const token= jwt.sign({id: userExist._id}, process.env.SecretKey, {expiresIn: '1h'});
        res.status(200).json({token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'})
    }
}

// protected route
const profile= async(req,res)=>{
    const userData= await User.findById(req.user.id);
    res.status(200).json({message: 'Profile Accessed', userData});
}


module.exports= {register, login, profile};