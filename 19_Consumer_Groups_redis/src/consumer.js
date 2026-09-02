import Redis from "ioredis";

const redis = new Redis(
  "redis://localhost:6379"
);

const STREAM = "email-events";
const GROUP = "email-workers";

try {
  await redis.xgroup(
    "CREATE",
    STREAM,
    GROUP,
    "0",
    "MKSTREAM"
  );
} catch (error) {
  if (!error.message.includes("BUSYGROUP")) {
    throw error;
  }
}

console.log("Waiting for events...");

while (true) {
  const result = await redis.xreadgroup(
    "GROUP",
    GROUP,
    "worker-1",
    "COUNT",
    1,
    "BLOCK",
    5000,
    "STREAMS",
    STREAM,
    ">"
  );

  if (!result) continue;

  console.dir(result, {
    depth: null
  });
}