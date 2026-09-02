import express from "express";
import Redis from "ioredis";

const app = express();

app.use(express.json());

const redis = new Redis(process.env.REDIUS_URL || "redis://localhost:6379");

redis.on("connect",()=>{
    console.log("Redis connected !! ")

});

redis.on("error",()=>{
    console.log("connection failed !! ")
})

app.post("/data" , async(req ,res)=>{
    const {
        key ,
        value
    } = req.body

    if(!key || value === undefined){
        return res.status(400).json({
            message:"key and value are required"
        });

    };
    await redis.set(key , value);
    res.json({
        message:"data stored",
        key ,
        value
    });
});

app.get("/data/:key", async (req, res) => {
  const value = await redis.get(req.params.key);

  res.json({
    key: req.params.key,
    value
  });
});

app.get("/persistence", async (req, res) => {
  const info = await redis.info("persistence");

  res.type("text").send(info);
});

app.post("/snapshot", async (req, res) => {
  const result = await redis.bgsave();

  res.json({
    message: "Background snapshot started",
    result
  });
});

app.post("/aof-rewrite", async (req, res) => {
  const result = await redis.bgrewriteaof();

  res.json({
    message: "AOF rewrite started",
    result
  });
});

app.get("/health", async (req, res) => {
  const pong = await redis.ping();

  res.json({
    redis: pong
  });
});

app.listen(3000, () => {
  console.log("Persistence project running on http://localhost:3000");
});