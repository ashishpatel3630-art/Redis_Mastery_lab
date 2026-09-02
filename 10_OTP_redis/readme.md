# 10 — OTP with Redis

This folder implements a temporary OTP system using Redis and TTL.

## Flow
```text
Generate OTP
    |
    v
Redis SET otp:<phone> <otp> EX 300
    |
    v
User submits OTP
    |
    v
Redis GET
    |
    +-- invalid → reject
    |
    +-- valid → delete OTP → accept
```

## Example
```redis
SET otp:9876543210 483921 EX 300
GET otp:9876543210
TTL otp:9876543210
DEL otp:9876543210
```

## Security concepts
- Short expiration
- One-time verification
- Delete after successful verification
- Do not return OTPs in production APIs
- Add retry/rate limits in production

## Real-world uses
- Login verification
- Phone verification
- Password reset
- Account recovery
