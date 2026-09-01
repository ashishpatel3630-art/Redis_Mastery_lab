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

app.post("/score/increase" , async(req , res)=>{
    const {
        player ,
        score
    } = req.body
    await redis.zincrby(
        LEADERBOARD_KEY,
        score,
        player 
    ); 
    res.json({
        message: "Score updated" ,
        player,
        score
    })

});

app.get("/leaderboard" , async(req , res)=>{
    const leaderboard = await redis.zrevrange(
        LEADERBOARD_KEY,
        0,
        9,
        "WITHSCORES"
    );
    const result =[];
    for(let i=0 ; i<leaderboard.length ; i+=2){
        result.push({
            player: leaderboard[i],
            score: leaderboard[i+1]
        })  
    }
    res.json({
        message: "Leaderboard fetched",
        leaderboard: result
    })  
});

app.listen(3000 , ()=>{
    console.log("server is running on port http://localhost:3000");
});