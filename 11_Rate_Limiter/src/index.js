import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.get("/api" , async (req, res) => {
    const ip = req.ip;
    const currentTime = Math.floor(Date.now() / 1000);
    const windowSize = 60; // 1 minute
    const maxRequests = 5;

    const key = `rate_limit:${ip}:${Math.floor(currentTime / windowSize)}`;

    const requests = await redis.incr(key);
    if (requests === 1) {
        await redis.expire(key, windowSize);
    }

    if (requests > maxRequests) {
        return res.status(429).json({ message: "Too many requests. Please try again later." });
    }

    res.json({ message: "Request successful." });
});

app.listen(3000, () => {
    console.log("server is running on port http://localhost:3000");
}); 
