const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User}=require("../model/models");

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;

    try {
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User Already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            name,
            email,
            password:hashedPassword,
        });

        const savedUser = await newUser.save();
        const token = jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }  // Token expires in 1 day
        );
        res.status(200).json({
            success: true,
            token: token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });
    }catch(err){
        console.error("Register Error",err.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

const loginUser= async(req,res)=>{
    const{email,password}=req.body;
    try{
      const existingUser=await User.findOne({email});
      if(!existingUser){
        return res.status(400).json({message:"Invalid Credentials"});
      }
      const isMatch=await bcrypt.compare(password,existingUser.password);

      if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
      }
      const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }  
    );
    res.status(200).json({
        success: true,
        token: token,
        user: {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
        }
    });
    }catch(err){
        console.error("Login Error:",err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports={registerUser,loginUser};