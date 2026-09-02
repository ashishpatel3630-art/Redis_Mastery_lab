import Redis from "ioredis";

const redis = new Redis(
  "redis://localhost:6379"
);

await redis.setbit(
  "activity:2026-08-31",
  101,
  1
);

const active = await redis.getbit(
  "activity:2026-08-31",
  101
);

const total = await redis.bitcount(
  "activity:2026-08-31"
);

console.log({
  active,
  total
});

await redis.quit();