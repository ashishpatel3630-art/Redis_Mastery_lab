# 14 — Redis Transactions

This folder demonstrates Redis transactions with `MULTI` and `EXEC`.

## Example
Transfer ₹100:
```text
Ashish wallet: 1000
Rahul wallet:   500

Ashish -100
Rahul  +100

Result:
Ashish = 900
Rahul  = 600
```

## Node.js
```js
const transaction = redis.multi();

transaction.decrby("wallet:aashish", 100);
transaction.incrby("wallet:rahul", 100);

const result = await transaction.exec();
```

## Core commands
```redis
MULTI
DECRBY wallet:aashish 100
INCRBY wallet:rahul 100
EXEC
```

## Important
Redis transactions execute queued commands atomically as a sequence, but they do not provide automatic rollback like many relational database transactions.

## Next concept
Study `WATCH` for optimistic concurrency control.
