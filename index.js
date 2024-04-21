import express from "express"
import dotenv from 'dotenv'             
import http from "http"

dotenv.config();
const port=process.env.PORT || 5000;

const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        allowedHeaders:["*"],
        origin:"*"
    }
});

// default 
app.get('/',(req,res)=>{
    res.send("hi i am default auth backend");
});
