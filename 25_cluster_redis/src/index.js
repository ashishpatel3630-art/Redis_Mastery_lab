import express from "express";
import Redis from "ioredis";

const app = express();

app.use(express.json());

const cluster = new Redis.Cluster([
  {
    host: "127.0.0.1",
    port: 7000
  },
  {
    host: "127.0.0.1",
    port: 7001
  },
  {
    host: "127.0.0.1",
    port: 7002
  }
], {
  redisOptions: {
    maxRetriesPerRequest: 3
  }
});

cluster.on("connect", () => {
  console.log("Redis Cluster connected");
});

cluster.on("ready", () => {
  console.log("Redis Cluster ready");
});

cluster.on("error", (error) => {
  console.error("Redis Cluster error:", error);
});

cluster.on("node error", (error) => {
  console.error("Redis Cluster node error:", error);
});

/*
  Health
*/
app.get("/health", async (req, res) => {
  try {
    const result = await cluster.ping();

    res.json({
      status: "healthy",
      redis: result
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      message: error.message
    });
  }
});

/*
  Set key
*/
app.post("/set", async (req, res) => {
  try {
    const { key, value } = req.body;

    if (!key || value === undefined) {
      return res.status(400).json({
        message: "key and value are required"
      });
    }

    await cluster.set(key, value);

    res.json({
      success: true,
      key,
      value
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/*
  Get key
*/
app.get("/get/:key", async (req, res) => {
  try {
    const key = req.params.key;

    const value = await cluster.get(key);

    res.json({
      key,
      value
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/*
  Delete key
*/
app.delete("/delete/:key", async (req, res) => {
  try {
    const key = req.params.key;

    const result = await cluster.del(key);

    res.json({
      key,
      deleted: result === 1
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/*
  Multiple keys
*/
app.post("/users", async (req, res) => {
  try {
    const { id, name } = req.body;

    const key = `user:${id}`;

    await cluster.hset(key, {
      id,
      name
    });

    res.json({
      success: true,
      key,
      user: {
        id,
        name
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/*
  Get user
*/
app.get("/users/:id", async (req, res) => {
  try {
    const key = `user:${req.params.id}`;

    const user = await cluster.hgetall(key);

    res.json({
      key,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/*
  Cluster key information
*/
app.get("/cluster/key/:key", async (req, res) => {
  try {
    const key = req.params.key;

    const slot = await cluster.cluster("KEYSLOT", key);

    res.json({
      key,
      hashSlot: Number(slot)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/*
  Cluster info
*/
app.get("/cluster/info", async (req, res) => {
  try {
    const info = await cluster.cluster("INFO");

    res.type("text").send(info);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/*
  Cluster nodes
*/
app.get("/cluster/nodes", async (req, res) => {
  try {
    const nodes = await cluster.cluster("NODES");

    res.type("text").send(nodes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/*
  Cluster slots
*/
app.get("/cluster/slots", async (req, res) => {
  try {
    const slots = await cluster.cluster("SLOTS");

    res.json({
      slots
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.listen(3032, () => {
  console.log(
    "Redis Cluster API running on http://localhost:3032"
  );
});