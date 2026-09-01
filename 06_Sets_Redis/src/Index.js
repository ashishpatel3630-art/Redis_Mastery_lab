import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const SET_KEY = "SET_KEY";

app.post("/follow", async (req, res) => {
  const { userID, targetID } = req.body;

  await redis.sadd(SET_KEY + ":" + userID, targetID);
  res.json({
    message: "Following",
  });
});

app.post("/unfollow", async (req, res) => {
  const { userID, targetID } = req.body;

  await redis.srem(SET_KEY + ":" + userID, targetID);
  res.json({
    message: "Unfollowed",
  });
});

app.get("/followers/:userID", async (req, res) => {
  const { userID } = req.params;
  const followers = await redis.smembers(SET_KEY + ":" + userID);
  res.json({
    message: "Followers fetched",
    users: followers,
  });
});

app.listen(3000, () => {
  console.log("server is running on port http://localhost:3000");
});
