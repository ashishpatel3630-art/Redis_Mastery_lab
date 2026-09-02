# 09 — Redis Counters

This folder demonstrates atomic counters using Redis numeric commands.

## Core commands
```redis
SET counter:views 0
INCR counter:views
INCRBY counter:views 10
DECR counter:views
DECRBY counter:views 5
GET counter:views
```

## Hash-based daily counter
```redis
HINCRBY counters:visits 2026-09-02 1
HGET counters:visits 2026-09-02
```

## Real-world uses
- Page views
- Likes
- Downloads
- API usage
- Daily statistics
- Inventory counts

## Key idea
Redis increment operations are atomic, making them useful for high-concurrency counters.
