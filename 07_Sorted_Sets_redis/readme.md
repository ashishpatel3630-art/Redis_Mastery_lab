# 07 — Redis Sorted Sets

This folder demonstrates Sorted Sets (ZSETs), which combine unique members with numeric scores.

## Core commands
```redis
ZADD leaderboard 100 Ashish
ZADD leaderboard 250 Rahul
ZADD leaderboard 180 Amit

ZRANGE leaderboard 0 -1 WITHSCORES
ZREVRANGE leaderboard 0 -1 WITHSCORES
ZINCRBY leaderboard 50 Ashish
ZSCORE leaderboard Ashish
```

## Mental model
```text
Rahul  → 250
Amit   → 180
Ashish → 150
```

## Real-world uses
- Leaderboards
- Rankings
- Priority systems
- Top-N queries
- Scores and points

## Important
`ZINCRBY` increases an existing score; it does not replace it.
