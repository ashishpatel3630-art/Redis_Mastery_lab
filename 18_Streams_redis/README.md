# 18 — Redis Streams

This folder introduces Redis Streams for durable, ordered event data.

## Mental model
```text
Producer
   |
   v
Redis Stream
   |
   +---- Event 1
   +---- Event 2
   +---- Event 3
   +---- Event 4
```

## Core commands
```redis
XADD orders * user Ashish amount 999
XRANGE orders - +
XLEN orders
```

## Why Streams?
Unlike Pub/Sub, stream entries remain stored until they are trimmed/deleted.

## Real-world uses
- Event pipelines
- Order processing
- Activity feeds
- Audit logs
- Background processing

## Next step
Combine Streams with Consumer Groups for scalable worker processing.
