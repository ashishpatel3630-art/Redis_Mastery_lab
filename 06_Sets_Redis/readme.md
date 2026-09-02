# 06 — Redis Sets

This folder demonstrates Redis Sets: collections of unique values.

## Core commands
```redis
SADD user:1:following 2
SADD user:1:following 3
SADD user:1:following 3

SMEMBERS user:1:following
SISMEMBER user:1:following 3
SCARD user:1:following
SREM user:1:following 3
```

Adding the same member twice does not create a duplicate.

## Real-world example
```text
user:1:following
├── 2
├── 3
└── 7
```

## Real-world uses
- Followers/following
- Tags
- Unique visitors
- Membership checks
- User groups

## Key idea
Use Sets when uniqueness matters and ordering does not.
