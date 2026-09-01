import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const COUNTERS_KEY = "COUNTERS_KEY";

app.post("/vists", async(req,res)=>{
    const today = new Date().toISOString().split("T")[0];
    await redis.hincrby(
        COUNTERS_KEY,
        today,
        1
    )
    res.json({
        message: "Visit counted"
    })
})


app.get("/views", async(req,res)=>{
    const today = new Date().toISOString().split("T")[0];
    const visits = await redis.hget(
        COUNTERS_KEY,
        today
    )
    res.json({
        message: "Views fetched",
        visits: visits || 0
    })
})

app.listen(3000, () => {
  console.log("server is running on port http://localhost:3000");
}); 
