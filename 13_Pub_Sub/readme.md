# 13 — Redis Pub/Sub

This folder introduces Redis Publish/Subscribe messaging.

## Core idea
```text
Publisher
    |
    | PUBLISH
    v
Redis Channel
    |
    +---------> Subscriber A
    |
    +---------> Subscriber B
```

## Commands
Publisher:
```redis
PUBLISH notifications "New order received"
```

Subscriber:
```redis
SUBSCRIBE notifications
```

## Node.js concept
Use separate Redis connections for publishing and subscribing because a subscribed connection is dedicated to subscription commands.

## Real-world uses
- Live notifications
- Chat events
- Real-time UI updates
- Cache invalidation signals
- Lightweight event broadcasting

## Important
Pub/Sub is ephemeral. If a subscriber is offline, it does not receive old messages. Use Redis Streams when durable event history is required.
