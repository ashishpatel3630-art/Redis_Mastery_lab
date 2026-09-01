import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const LEADERBOARD_KEY = "LEADERBOARD_KEY";

app.post("/score", async(req, res)=>{
    const {
        player ,
        score
    } = req.body
    await redis.zadd(
        LEADERBOARD_KEY,
        score,
        player
    )
    res.json({
        message: "Score added"
    })
})
