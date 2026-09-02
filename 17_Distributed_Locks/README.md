# 17 — Distributed Locks

This folder introduces distributed locking with Redis.

## Problem
Multiple application instances may try to modify the same resource simultaneously.

```text
Server A ─┐
          ├──> Shared resource
Server B ─┘
```

A lock ensures only one worker enters the critical section at a time.

## Basic Redis lock
```redis
SET lock:order:123 unique-token NX EX 30
```

- `NX` → create only if the key does not exist
- `EX 30` → automatic expiration

## Flow
```text
Acquire lock
     |
     +-- success → work → release lock
     |
     +-- failure → retry / reject
```

## Important
The lock value should be unique to the lock owner, and release should verify ownership rather than blindly deleting the key.

## Real-world uses
- Prevent duplicate jobs
- Inventory reservation
- Scheduled tasks
- Payment processing
- Leader election patterns
