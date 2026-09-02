import Redis from "ioredis";

const redis = new Redis(
  "redis://localhost:6379"
);

const message = process.argv[2] || "Hello Redis";

await redis.publish(
  "notifications",
  message
);

console.log("Message published");

await redis.quit();