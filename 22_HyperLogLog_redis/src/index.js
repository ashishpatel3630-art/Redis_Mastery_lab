import Redis from "ioredis";

const redis = new Redis(
  "redis://localhost:6379"
);

await redis.pfadd(
  "unique:visitors",
  "user1",
  "user2",
  "user3",
  "user1"
);

const count = await redis.pfcount(
  "unique:visitors"
);

console.log(
  "Approx unique users:",
  count
);

await redis.quit();