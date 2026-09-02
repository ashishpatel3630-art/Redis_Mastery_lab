# 21 — Redis Bitmaps

This folder introduces Redis Bitmaps for compact boolean/bit-level state.

## Core commands
```redis
SETBIT attendance:2026-09-02 1 1
GETBIT attendance:2026-09-02 1
BITCOUNT attendance:2026-09-02
```

## Mental model
Each bit represents a boolean state:

```text
User IDs
0 1 2 3 4 5 6 7

Bits
0 1 0 1 1 0 0 1
  ↑   ↑ ↑     ↑
 active users
```

## Real-world uses
- Daily active users
- Feature flags
- Attendance
- Presence tracking
- Compact boolean sets

## Why Bitmaps?
They can represent very large numbers of boolean states using very little memory.
