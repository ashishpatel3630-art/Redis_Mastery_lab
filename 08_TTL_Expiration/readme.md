# 08 — TTL and Expiration

This folder teaches Redis key expiration and temporary data.

## Core commands
```redis
SET temporary:message "Hello Redis" EX 60
TTL temporary:message
GET temporary:message
DEL temporary:message
```

## TTL meanings
```text
TTL >= 0  → seconds remaining
TTL -1    → key exists without expiration
TTL -2    → key does not exist
```

## Node.js
```js
await redis.set("temporary:message", "Hello", "EX", 60);
```

## Real-world uses
- OTPs
- Sessions
- Cache entries
- Verification codes
- Temporary locks
- Rate-limit windows
