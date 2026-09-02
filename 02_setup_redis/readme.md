# 02 — Setup Redis

This folder sets up Redis locally using Docker and prepares the development environment for the remaining labs.

## Stack
- Redis
- Docker
- Node.js
- ioredis

## Start Redis
```bash
docker compose up -d
```

## Check container
```bash
docker ps
```

## Open Redis CLI inside Docker
```bash
docker exec -it redis_mastery redis-cli
```

## Test Redis
```redis
PING
SET name Ashish
GET name
```

Expected:
```text
PONG
Ashish
```

## Node.js connection
```js
import Redis from "ioredis";

const redis = new Redis("redis://localhost:6379");
```

## Goal
Create a repeatable Redis development environment without requiring Redis CLI to be installed directly on macOS.
