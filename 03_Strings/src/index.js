import express from "express";
import { numberValueTypes } from "framer-motion";
import Redis from "ioredis";

const app = express();

app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const COUNTER_KEY = "counter:views";

app.post("/increment" , async(req , res)=>{
    const value = await redis.incr(COUNTER_KEY);
    res.json({
        counter:value
    });
});

app.post("/decrement" , async(req , res)=>{
    const value = await redis.decr(COUNTER_KEY);
    res.json({
        counter:value
    });
});

app.get("/counter" , async(req, res)=>{
    const value = await redis.get(COUNTER_KEY);

    res.json({
        counter:Number(value||0)
    });
});

app.delete("/counter" , async(req , res )=>{
    const value = await redis.del(COUNTER_KEY);

    res.json({
        message: "Counter Reset"
    });
});

app.listen(3000 ,()=>{
    console.log("server is running on port http://localhost:3000");
});