import User from "../models/user.model.js";
import bcrypt, { hash } from 'bcrypt'

const signup= async(req,res)=>{

    try{
        const {username,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const foundUser=await User.findOne({username});

        if(foundUser){
            res.status(201).json({message:"username already exists"});
        }
        else{
            const user=new User({username:username,password:hashedPassword});
            await user.save();
            res.status(201).json({message:"user created"});
        }

    }
    catch(error){
        console.log("Error in sign up "+error);
        res.status(201).json({message:"user registration failed"});
    }

}

export default signup;