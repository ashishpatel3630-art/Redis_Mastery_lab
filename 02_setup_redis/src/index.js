import express from "express";
import Redis from "ioredis"

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on("connect" ,()=>{
    console.log("redis is connected");
});

redis.on("error" ,(err)=>{
    console.log("redis error : " , err);
});

app.get("/" , async(req , res)=>{
    const result = await redis.ping();
    res.json({
        message :"redis is working",
        redis : result
    });
});

app.listen(3000 , ()=>{
    console.log("server is running on port http://localhost:3000");
});
