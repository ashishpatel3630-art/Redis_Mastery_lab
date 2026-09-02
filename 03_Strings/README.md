# 03 — Redis Strings

This folder covers Redis Strings, the simplest and most commonly used Redis data type.

## What you'll learn
- SET / GET
- DEL
- EXISTS
- INCR / DECR
- INCRBY / DECRBY
- String-based counters
- Storing serialized JSON

## Examples
```redis
SET name Ashish
GET name

SET balance 1000
INCRBY balance 500
DECRBY balance 100
GET balance
```

## Node.js
```js
await redis.set("name", "Ashish");
const name = await redis.get("name");
```

## Real-world uses
- Cache values
- Tokens
- Counters
- Flags
- JSON payloads
- Simple configuration values
