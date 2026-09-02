import Redis from "ioredis";

const subscriber = new Redis(
  "redis://localhost:6379"
);

await subscriber.subscribe("notifications");

console.log("Subscribed to notifications");

subscriber.on("message", (channel, message) => {
  console.log(
    `Received from ${channel}: ${message}`
  );
});