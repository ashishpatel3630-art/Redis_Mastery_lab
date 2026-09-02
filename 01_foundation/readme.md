# 01 — Redis Foundation

This folder introduces the core concepts behind Redis and establishes the mental model used throughout the Redis Mastery Lab.

## What you'll learn
- What Redis is and why it is fast
- In-memory data storage
- Key-value model
- Redis vs relational databases
- Redis persistence: RDB and AOF
- Basic Redis architecture
- Redis CLI
- Core Redis data types
- A roadmap from Redis fundamentals to production concepts

## Core commands
```redis
PING
SET name Ashish
GET name
EXISTS name
TYPE name
TTL name
DEL name
```

## Mental model
```text
Application
    |
    v
  Redis
  /    RAM  Persistence
      /           RDB     AOF
```

## Goal
Move from knowing individual Redis commands to understanding when Redis should be used in a backend/system-design architecture.
