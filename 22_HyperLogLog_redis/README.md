# 22 — Redis HyperLogLog

This folder introduces HyperLogLog for approximate cardinality counting.

## Problem
You want to count unique visitors without storing every visitor ID.

```text
Visitor IDs
A A B C C D E F F G

Exact unique count = 7
```

HyperLogLog estimates the unique count using a very small amount of memory.

## Core commands
```redis
PFADD visitors user1
PFADD visitors user2
PFADD visitors user1
PFCOUNT visitors
```

## Merge multiple sets
```redis
PFMERGE visitors:all visitors:today visitors:yesterday
PFCOUNT visitors:all
```

## Real-world uses
- Unique visitors
- Unique searches
- Analytics
- Approximate cardinality
- Large-scale metrics

## Important
HyperLogLog is approximate, not an exact counter. Its value is memory efficiency at large cardinalities.
