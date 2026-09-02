import express from "express";
import Redis from "ioredis";

const app = express();

const redis = new Redis(
  "redis://localhost:6379"
);

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;

  const cacheKey = `product:${id}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.json({
      source: "redis-cache",
      product: JSON.parse(cached)
    });
  }


  const product = {
    id,
    name: "Redis Course",
    price: 999
  };

  await redis.set(
    cacheKey,
    JSON.stringify(product),
    "EX",
    60
  );

  res.json({
    source: "database",
    product
  });
});

app.delete("/products/:id/cache", async (req, res) => {
  await redis.del(
    `product:${req.params.id}`
  );

  res.json({
    message: "Cache deleted"
  });
});

app.listen(3010, () => {
  console.log("Cache project running on 3010");
});