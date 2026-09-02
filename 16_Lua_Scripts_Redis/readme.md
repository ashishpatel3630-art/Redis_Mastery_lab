# 16 — Redis Lua Scripts

This folder demonstrates executing custom Lua logic directly inside Redis.

## Example use case
Atomically decrease a balance:

```text
balance = 1000
amount  = 100

Lua script
    |
    +-- GET balance
    +-- calculate 1000 - 100
    +-- SET balance 900
    |
    v
Result = 900
```

## Node.js
```js
const script = fs.readFileSync("./script.lua", "utf8");

const result = await redis.eval(
  script,
  1,
  "balance",
  100
);
```

## Redis EVAL arguments
```text
EVAL script number_of_keys key1 ... arg1 ...
```

## Why Lua?
Lua scripts allow multiple Redis operations and business logic to execute atomically inside Redis.

## Real-world uses
- Atomic counters
- Inventory checks
- Wallet operations
- Rate limiting
- Conditional updates

## Key rule
Keep scripts deterministic and efficient because long-running scripts block normal command execution.
