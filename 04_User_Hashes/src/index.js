import express from "express";
import Redis from "ioredis";

const app = express();
use.app(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/users" , async(req , res)=>{
    const {
        id , 
        name ,
        email ,
        age
    } = req.body
    
    await redis.hset
});
