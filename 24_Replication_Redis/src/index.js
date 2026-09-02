import express from "express";
import Redis from "ioredis";

const app = express();

app.use(express.json());

const master = new Redis("redis://localhost:6379");

const replica = new Redis("redis://localhost:6379");

master.on("connect", () => {
  console.log("Redis Master connected");
});

master.on("error", (error) => {
  console.error(
    "Master Redis error:",
    error.message
  );
});

replica.on("connect", () => {
  console.log("Redis Replica connected");
});

replica.on("error", (error) => {
  console.error(
    "Replica Redis error:",
    error.message
  );
});


app.post("/master/set", async (req, res) => {
  try {
    const { key, value } = req.body;

    if (!key || value === undefined) {
      return res.status(400).json({
        message: "key and value are required"
      });
    }

    await master.set(key, value);

    res.json({
      success: true,
      message: "Data written to master",
      key,
      value
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


app.get("/master/get/:key", async (req, res) => {

  try {

    const value =
      await master.get(req.params.key);

    res.json({
      source: "master",
      key: req.params.key,
      value
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



app.get("/replica/get/:key", async (req, res) => {

  try {

    const value =
      await replica.get(req.params.key);

    res.json({
      source: "replica",
      key: req.params.key,
      value
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


app.get("/master/replication", async (req, res) => {

  try {

    const info =
      await master.info("replication");

    res.type("text").send(info);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});




app.get("/replica/replication", async (req, res) => {

  try {

    const info =
      await replica.info("replication");

    res.type("text").send(info);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


app.get("/master/health", async (req, res) => {

  const result =
    await master.ping();

  res.json({
    server: "master",
    redis: result
  });

});




app.get("/replica/health", async (req, res) => {

  const result =
    await replica.ping();

  res.json({
    server: "replica",
    redis: result
  });

});



app.post("/replica/set", async (req, res) => {

  try {

    const { key, value } = req.body;

    await replica.set(key, value);

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



app.listen(3000, () => {

  console.log(
    "Replication project running on http://localhost:3000"
  );

});