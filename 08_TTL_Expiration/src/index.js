import express from "express";
import Redis from "ioredis";

const app = express();

app.use(express.json());

const redis = new Redis("redis://localhost:6379");

app.post("/message", async (req, res) => {
  await redis.set(
    "temporary:message",
    req.body.message,
    "EX",
    60
  );

  res.json({
    message: "Message saved for 60 seconds"
  });
});

app.get("/message", async (req, res) => {
  const message = await redis.get(
    "temporary:message"
  );

  const ttl = await redis.ttl(
    "temporary:message"
  );

  res.json({
    message,
    ttl
  });
});

app.listen(3006, () => {
  console.log("TTL project running on 3006");
});