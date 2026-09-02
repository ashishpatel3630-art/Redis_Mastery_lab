# 19 — Redis Consumer Groups

This folder builds on Redis Streams by introducing Consumer Groups.

## Architecture
```text
             Redis Stream
                  |
        Consumer Group
        /      |             v       v       v
   Worker A Worker B Worker C
```

Messages can be distributed across consumers so multiple workers can process a stream concurrently.

## Core commands
```redis
XGROUP CREATE orders workers $ MKSTREAM
XREADGROUP GROUP workers worker-1 COUNT 10 STREAMS orders >
XACK orders workers <message-id>
```

## Important concepts
- Consumer group
- Consumer
- Pending entries
- Acknowledgement
- Message delivery
- Recovery/retry

## Real-world uses
- Email workers
- Order processing
- Notifications
- Background jobs
- Event-driven backend systems
