# 11 — Redis Rate Limiter

This folder implements a fixed-window API rate limiter using Redis.

## Rule
```text
Maximum: 5 requests
Window: 60 seconds
Identity: client IP
```

## Key structure
```text
rate_limit:<ip>:<window>
```

## Flow
```text
Request
   |
   v
Identify IP
   |
   v
Calculate 60-second window
   |
   v
Redis INCR
   |
   +-- <= 5 → 200
   |
   +-- > 5  → 429
```

## Core commands
```redis
INCR rate_limit:127.0.0.1:<window>
EXPIRE rate_limit:127.0.0.1:<window> 60
TTL rate_limit:127.0.0.1:<window>
```

## Real-world uses
- Protect APIs
- Prevent abuse
- Login attempt limits
- Public API quotas

## Note
This lab uses a fixed window. Production systems may use sliding-window or token-bucket approaches for smoother limits.
