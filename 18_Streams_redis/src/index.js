import Redis from "ioredis";

const redis = new Redis(
  "redis://localhost:6379"
);

const id = await redis.xadd(
  "events",
  "*",
  "type",
  "USER_LOGIN",
  "userId",
  "101"
);

console.log("Event ID:", id);

const events = await redis.xrange(
  "events",
  "-",
  "+"
);

console.dir(events, {
  depth: null
});

await redis.quit();