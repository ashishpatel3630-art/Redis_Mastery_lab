# 04 — Redis Hashes: User Profiles

This folder demonstrates Redis Hashes for storing structured objects such as user profiles.

## Data model
```text
user:1
├── name  → Ashish
├── email → ashish@example.com
└── age   → 21
```

## Core commands
```redis
HSET user:1 name Ashish email ashish@example.com age 21
HGET user:1 name
HGETALL user:1
HDEL user:1 age
EXISTS user:1
```

## Node.js
```js
await redis.hset("user:1", {
  name: "Ashish",
  email: "ashish@example.com",
  age: "21"
});
```

## Why Hashes?
They allow multiple fields to be grouped under one Redis key without serializing the entire object.

## Real-world uses
- User profiles
- Product metadata
- Session data
- Configuration objects
