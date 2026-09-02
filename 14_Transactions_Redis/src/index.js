import Redis from "ioredis";

const redis = new Redis(
  "redis://localhost:6379"
);

await redis.set("wallet:aashish", 1000);
await redis.set("wallet:rahul", 500);


const transaction = redis.multi();

transaction.decrby(
  "wallet:aashish",
  100
);

transaction.incrby(
  "wallet:rahul",
  100
);

const result = await transaction.exec();

console.log(result);

await redis.quit();