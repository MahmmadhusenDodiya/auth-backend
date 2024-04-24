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
        console.log("Error in  sign up "+error);
        res.status(201).json({message:"user registration failed"});
    }

}

export const login= async(req,res)=>{
    console.log("1 ---- inside auth.js login");
    console.log("1-----sdfds  ");
    try{
        console.log("2 ---- inside auth.js login");
        const {username,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const foundUser=await User.findOne({username});
        console.log("founduser ===="+foundUser);
        if(!foundUser){
            res.status(401).json({message:"Login Failed User Not Found"});
        }
        else{
            const passwordfromdb =foundUser?.password;
            console.log(passwordfromdb);
            const user=new User({username:username,password:hashedPassword});
            generateJWTTokenAndSetCooke(user._id,res);
            //await user.save();
            res.status(201).json({message:"Login Successful"});
            
            
            

        }

    }
    catch(error){
        console.log("Error in login up "+error);
        res.status(401).json({message:"user registration failed 1"});
    }
}


export default signup;