import Redis from "ioredis";
import fs from "fs";

const redis = new Redis(
  "redis://localhost:6379"
);

const script = fs.readFileSync(
  "./script.lua",
  "utf8"
);

await redis.set("balance", 1000);

const result = await redis.eval(
  script,
  1,
  "balance",
  100
);

console.log("Result:", result);

console.log(
  "Balance:",
  await redis.get("balance")
);

await redis.quit();