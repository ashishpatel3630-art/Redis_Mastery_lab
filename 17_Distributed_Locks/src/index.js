import Redis from "ioredis";
import crypto from "crypto";

const redis = new Redis(
  "redis://localhost:6379"
);

const lockKey = "lock:ticket";
const token = crypto.randomUUID();

const acquired = await redis.set(
  lockKey,
  token,
  "NX",
  "EX",
  10
);

if (acquired === "OK") {
  console.log("Lock acquired");

  try {
    console.log("Processing ticket...");

    await new Promise(resolve =>
      setTimeout(resolve, 3000)
    );
  } finally {
    const currentToken =
      await redis.get(lockKey);

    if (currentToken === token) {
      await redis.del(lockKey);
    }

    console.log("Lock released");
  }
} else {
  console.log("Could not acquire lock");
}

await redis.quit();