# 12 — Redis Caching

This folder demonstrates the Cache-Aside pattern using Node.js, Express, and Redis.

## Flow
```text
GET /products/:id
        |
        v
    Redis GET
      /      HIT     MISS
    |        |
    v        v
 Return   Fetch data
 cache       |
             v
        Store in Redis
             |
             v
          Return
```

## Cache key
```text
product:<id>
```

## TTL
The example stores product data for 60 seconds.

```js
await redis.set(
  cacheKey,
  JSON.stringify(product),
  "EX",
  60
);
```

## Cache invalidation
```http
DELETE /products/:id/cache
```

## Real-world uses
- Product pages
- API responses
- Frequently accessed database records
- Sessions
- Configuration
- Expensive computations
