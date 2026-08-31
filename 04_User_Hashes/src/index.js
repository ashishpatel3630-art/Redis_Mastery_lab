import express from "express";
import Redis from "ioredis";

const app = express();

app.use(express.json());

const redis = new Redis(
    process.env.REDIS_URL || "redis://localhost:6379"
);

// CREATE USER
app.post("/users", async (req, res) => {
    const {
        id,
        name,
        email,
        age
    } = req.body;

    await redis.hset(`user:${id}`, {
        name,
        email,
        age
    });

    res.json({
        message: "User created"
    });
});

// GET USER
app.get("/users/:id", async (req, res) => {
    const user = await redis.hgetall(
        `user:${req.params.id}`
    );

    res.json(user);
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
    await redis.del(`user:${req.params.id}`);

    res.json({
        message: "User deleted"
    });
});

app.listen(3000, () => {
    console.log(
        "User Hashes is running on port http://localhost:3000"
    );
});