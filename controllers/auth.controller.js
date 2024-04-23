import User from "../models/user.model.js";
import bcrypt, { hash } from 'bcrypt';
import generateJWTTokenAndSetCooke from "../utils/genrateToken.js";


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
            generateJWTTokenAndSetCooke(user._id,res);
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