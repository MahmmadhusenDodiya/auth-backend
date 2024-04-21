import express from "express"
import dotenv from "dotenv"
import router from "./routes/auth.route.js";
import connectToMongoDB from "./database/connectToMongo.js";


dotenv.config();
const port=process.env.PORT || 5000;

const app=express();
app.use(express.json());

// default 
app.get('/',(req,res)=>{
    res.send("hi i am default auth backend");
    
});

app.use('/auth',router);
app.listen(port,()=>{
    connectToMongoDB();
    console.log(`Server is listening at http://localhost:${port}`);
});