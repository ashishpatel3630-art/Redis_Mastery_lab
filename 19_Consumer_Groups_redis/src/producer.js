import Redis from "ioredis";

const redis = new Redis(
  "redis://localhost:6379"
);

await redis.xadd(
  "email-events",
  "*",
  "type",
  "WELCOME_EMAIL",
  "email",
  "ashu@gmail.com"
);

console.log("Event added");

await redis.quit();