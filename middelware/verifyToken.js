import jwt from "jsonwebtoken"


const verifyToken=(req,res,next)=>{

    const token=req.cookies.jwt;
    if(!token)
    {
        return res.status(401).json({message:"Unauthorized: token not found"});
    }

    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRATE);
        next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized: token is not valid"});
        console.log(error.message);
    }

}

export default verifyToken;