# 24 — Redis Replication

A hands-on Redis replication lab demonstrating how a Redis primary server replicates its data to a replica server.

---

## 🎯 Goal

The goal of this project is to understand:

* Redis primary/replica architecture
* Replication
* Full synchronization
* Partial synchronization
* Replication offsets
* Read replicas
* Replica read-only behavior
* Replication monitoring
* What happens when a replica disconnects
* Basic Redis high-availability concepts

---

# 🏗️ Architecture

```text
                         Node.js API
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
        Redis Primary              Redis Replica
          Port 6381                  Port 6382
                │                         ▲
                │                         │
                └────── Replication ──────┘
```

The primary accepts writes.

The replica receives replicated data from the primary.

---

# 📂 Project Structure

```text
24_Replication_Redis/
│
├── src/
│   └── index.js
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🚀 Installation

Move into this folder:

```bash
cd 24_Replication_Redis
```

Install dependencies:

```bash
npm install
```

---

# 🐳 Start Redis

Start both Redis servers:

```bash
docker compose up -d
```

Check containers:

```bash
docker ps
```

You should see:

```text
redis_replication_master
redis_replication_replica
```

---

# 🔍 Check Redis Master

Open the Redis CLI:

```bash
docker exec -it redis_replication_master redis-cli
```

Run:

```redis
PING
```

Expected:

```text
PONG
```

---

# 🔍 Check Redis Replica

Open another terminal:

```bash
docker exec -it redis_replication_replica redis-cli
```

Run:

```redis
PING
```

Expected:

```text
PONG
```

---

# 🔗 Check Replication

Inside the master:

```redis
INFO replication
```

You should see information similar to:

```text
role:master
connected_slaves:1
```

The exact values can vary.

---

Inside the replica:

```redis
INFO replication
```

You should see:

```text
role:slave
master_host:redis-master
master_port:6379
```

---

# ✍️ Write Data to Master

Start the Node.js server:

```bash
npm run dev
```

The server runs on:

```text
http://localhost:3024
```

Create a key:

```bash
curl -X POST http://localhost:3024/master/set \
-H "Content-Type: application/json" \
-d '{"key":"username","value":"Ashish"}'
```

Expected:

```json
{
  "success": true,
  "message": "Data written to master",
  "key": "username",
  "value": "Ashish"
}
```

---

# 📖 Read From Master

```bash
curl http://localhost:3024/master/get/username
```

Expected:

```json
{
  "source": "master",
  "key": "username",
  "value": "Ashish"
}
```

---

# 📖 Read From Replica

Now read the same key from the replica:

```bash
curl http://localhost:3024/replica/get/username
```

Expected:

```json
{
  "source": "replica",
  "key": "username",
  "value": "Ashish"
}
```

This demonstrates replication.

The data was written to the master and became available on the replica.

---

# 🧪 Test Replica Read-Only Behavior

Try writing directly to the replica:

```bash
curl -X POST http://localhost:3024/replica/set \
-H "Content-Type: application/json" \
-d '{"key":"test","value":"hello"}'
```

You should receive an error similar to:

```text
READONLY You can't write against a read only replica.
```

This is expected.

The replica normally receives changes from the primary instead of accepting application writes.

---

# 📊 Replication Information

Master:

```bash
curl http://localhost:3024/master/replication
```

Replica:

```bash
curl http://localhost:3024/replica/replication
```

---

# ❤️ Health Checks

Master:

```bash
curl http://localhost:3024/master/health
```

Replica:

```bash
curl http://localhost:3024/replica/health
```

---

# 🔬 Redis CLI Experiment

Write from the master:

```bash
docker exec -it redis_replication_master redis-cli \
SET product "Redis"
```

Then read from the replica:

```bash
docker exec -it redis_replication_replica redis-cli \
GET product
```

Expected:

```text
Redis
```

---

# 🧪 Failure Experiment

First check the replication:

```bash
docker exec -it redis_replication_master redis-cli \
INFO replication
```

Then stop the replica:

```bash
docker stop redis_replication_replica
```

Write new data to the master:

```bash
docker exec -it redis_replication_master redis-cli \
SET message "Replication test"
```

Start the replica again:

```bash
docker start redis_replication_replica
```

Check:

```bash
docker exec -it redis_replication_replica redis-cli \
GET message
```

The replica should synchronize the missing data after reconnecting.

---

# 🧠 How Replication Works

Conceptually:

```text
Client
  |
  | SET user:1 Ashish
  ↓
Primary
  |
  | Replication
  ↓
Replica
```

The application writes to the primary.

Redis sends the changes to the replica.

The replica updates its local dataset.

---

# 🔄 Replication Flow

```text
1. Replica connects to primary
              ↓
2. Initial synchronization
              ↓
3. Dataset synchronization
              ↓
4. Primary continues serving writes
              ↓
5. Changes are propagated
              ↓
6. Replica updates its dataset
```

---

# 🧩 Important Concepts

## Primary

The primary Redis server normally handles application writes.

```text
SET
INCR
DEL
LPUSH
ZADD
```

etc.

---

## Replica

A replica maintains a copy of the primary's dataset.

It can be used for read workloads.

```text
Primary
   |
   ├── Replica 1
   |
   ├── Replica 2
   |
   └── Replica 3
```

---

# 📈 Read Scaling

Without replicas:

```text
             Redis
               ↑
          All requests
```

With replicas:

```text
                Primary
                  ↑
                Writes
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
    Replica 1  Replica 2  Replica 3
        ↑         ↑         ↑
      Reads     Reads     Reads
```

This can distribute read workloads.

---

# ⚠️ Important Trade-off

Replication does not automatically mean zero data loss.

There can be replication lag.

For example:

```text
Primary
   |
   | write
   ↓
Data exists
   |
   | small delay
   ↓
Replica
```

Therefore, applications must understand the consistency characteristics of their architecture.

---

# 🔥 Replication vs Backup

Replication:

```text
Primary
   ↓
Replica
```

provides another live copy of the dataset.

Backup:

```text
Redis
   ↓
Disk
   ↓
Backup
```

is intended for recovery.

Replication should not be treated as a replacement for backups.

---

# 🚀 What Comes Next?

Replication is the foundation for the next concepts in this Redis Mastery Lab:

```text
24 Replication
       ↓
25 Sentinel
       ↓
26 Redis Cluster
       ↓
27 Security / ACL
       ↓
28 Monitoring
       ↓
29 Performance Tuning
       ↓
30 Production Project
```

---

# 📚 What I Learned

After completing this project, I should be able to explain:

* What Redis replication is
* Primary vs replica
* Why replicas are useful
* How data moves from primary to replica
* Why replicas are normally read-only
* What replication lag means
* How to inspect replication status
* Why replication is different from backup
* How replication fits into a highly available Redis architecture

---

# 🔴 Redis Mastery Lab

**From Redis fundamentals → distributed systems → production architecture.**
