# 05 — Redis Lists

This folder introduces Redis Lists, ordered collections that are useful for queue-like workloads.

## Core commands
```redis
LPUSH tasks "Learn Redis"
RPUSH tasks "Learn Docker"
LRANGE tasks 0 -1
LPOP tasks
RPOP tasks
LLEN tasks
```

## Mental model
```text
LEFT                         RIGHT
  |                            |
  v                            v
[task-3] [task-2] [task-1] [task-0]
```

## Real-world uses
- Simple queues
- Task processing
- Recent activity
- Ordered events
- Job buffers

## Key idea
Lists preserve order. For more advanced durable event processing and consumer groups, Redis Streams are a better fit.
