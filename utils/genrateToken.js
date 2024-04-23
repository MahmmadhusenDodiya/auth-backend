import jwt from 'jsonwebtoken';


const generateJWTTokenAndSetCooke =(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRATE,{
        expiresIn:"1d"
    });

    res.cookie("jwt",token,{
        maxAge:1*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:false
    });

}

export default generateJWTTokenAndSetCooke;