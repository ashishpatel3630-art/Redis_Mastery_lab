import express from "express";
import Redis from 'ioredis';

const app = express();

app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const LIST_KEY = "QUEUE_LIST";

app.post("/tasks" , async(req , res)=>{
     const task ={
        id:Date.now(),
        title:req.body.title,
        description:req.body.description,
        tasks:req.body.tasks,
        status:req.body.status
     };
    await redis.rpush(LIST_KEY , JSON.stringify(task));
    res.json({
        message:"task added to the queue" ,
        task
    });
});

app.get("/tasks" , async(req , res)=>{
    const tasks = await redis.lrange(LIST_KEY , 0 , -1);
    res.json({
        tasks:tasks.map(task => JSON.parse(task))
    });
    
});