import Redis from "ioredis";

const redis = new Redis(
  "redis://localhost:6379"
);

await redis.geoadd(
  "drivers",
  77.5946,
  12.9716,
  "driver-1"
);

await redis.geoadd(
  "drivers",
  77.6060,
  12.9784,
  "driver-2"
);

const drivers = await redis.geosearch(
  "drivers",
  "FROMLONLAT",
  77.5946,
  12.9716,
  "BYRADIUS",
  5,
  "km",
  "WITHDIST"
);

console.log(drivers);

await redis.quit();