## 📌 What is Redis?

**Redis (Remote Dictionary Server)** is a fast, in-memory data store that works mainly with a **key-value model**.

A simple Redis example:

```redis
SET name Ashish
GET name
```

Output:

```text
"Ashish"
```

Think of Redis as:

```text
KEY → VALUE

name → Ashish
age  → 21
city → Bhopal
```

---

# 🚀 Why Redis is Fast

Redis is fast mainly because:

* Data is primarily kept in **RAM**
* It uses efficient data structures
* Its command execution model is simple and efficient
* Many common operations are very lightweight

Basic idea:

```text
Traditional Database

Application
     ↓
Database
     ↓
Disk
     ↓
Data
```

Redis:

```text
Application
     ↓
Redis
     ↓
RAM
     ↓
Data
```

This makes Redis especially useful when applications need **very low-latency access to frequently used data**.

---

# 🆚 Redis vs Traditional Databases

Redis and databases such as PostgreSQL or MySQL are often used **together**, rather than as direct replacements.

| Redis                       | Traditional Database                    |
| --------------------------- | --------------------------------------- |
| Very fast                   | Generally slower for simple key lookups |
| Memory-first                | Disk-first                              |
| Key-value + data structures | Relational tables                       |
| Excellent for caching       | Excellent for permanent business data   |
| Great for sessions          | Great for complex relationships         |
| Great for counters          | Great for complex queries               |
| Supports persistence        | Supports persistence                    |

Example architecture:

```text
              Application
               /       \
              ↓         ↓
           Redis     PostgreSQL
            ↓             ↓
          Fast         Permanent
          Data           Data
```

---

# 🧠 In-Memory Storage

Redis keeps its working dataset primarily in **RAM**.

Example:

```text
RAM

name → Ashish
age  → 21
city → Bhopal
```

### Why RAM?

Because RAM provides very fast access.

### The problem

RAM is volatile.

If the machine loses power, data that exists only in memory can be lost.

This is why Redis provides **persistence mechanisms**.

---

# 💾 Redis Persistence

Persistence allows Redis data to survive a restart.

The two major persistence mechanisms are:

```text
Redis Persistence
       │
       ├── RDB
       │
       └── AOF
```

### RDB

RDB creates snapshots of the dataset.

```text
RAM
 ↓
Snapshot
 ↓
Disk
```

### AOF

AOF records write operations.

```text
SET name Ashish
SET age 21
INCR counter
```

These operations can be used to rebuild the dataset after a restart.

Simple idea:

```text
RAM       → Fast
RDB/AOF   → Persistence
```

---

# 🔑 Key-Value Model

Redis fundamentally works around:

```text
KEY → VALUE
```

Example:

```redis
SET name Ashish
SET age 21
SET city Bhopal
```

Retrieve values:

```redis
GET name
GET age
GET city
```

Think of Redis like a programming dictionary:

```text
{
    "name": "Ashish",
    "age": "21",
    "city": "Bhopal"
}
```

But Redis can store much more than simple strings.

---

# ⚙️ Redis Execution Model

Redis is commonly described as **single-threaded** because command execution has historically centered around a single main execution thread.

For example:

```redis
SET counter 10
INCR counter
GET counter
```

The commands are processed in order:

```text
SET
 ↓
INCR
 ↓
GET
```

This simple execution model helps Redis keep command processing efficient and makes individual Redis commands atomic.

> Note: Modern Redis also uses additional threads for tasks such as networking and background work, so "Redis is single-threaded" is a useful simplification, not the complete architecture.

---

# 🏗️ Redis Architecture

A simplified Redis architecture looks like this:

```text
              Application
                   │
                   ▼
                Redis
                   │
             ┌─────┴─────┐
             ↓           ↓
            RAM       Persistence
                       /      \
                      ↓        ↓
                     RDB       AOF
```

In a real application:

```text
                 Application
                 /         \
                ↓           ↓
             Redis       PostgreSQL
               │
       ┌───────┼────────┐
       ↓       ↓        ↓
     Cache   Session   Queue
```

Redis can handle many different workloads depending on how it is designed into the system.

---

# 💻 Redis CLI

Redis CLI is the command-line interface used to interact with Redis.

Start the CLI:

```bash
redis-cli
```

You will see something similar to:

```text
127.0.0.1:6379>
```

Test the connection:

```redis
PING
```

Response:

```text
PONG
```

---

## Basic Commands

### SET

```redis
SET name Ashish
```

### GET

```redis
GET name
```

Output:

```text
"Ashish"
```

### EXISTS

```redis
EXISTS name
```

### DELETE

```redis
DEL name
```

### Check Type

```redis
TYPE name
```

### Check Expiration

```redis
TTL name
```

---

# 🧱 Redis Data Types

Redis provides several useful data structures.

```text
Redis Data Types
       │
       ├── String
       ├── List
       ├── Set
       ├── Hash
       └── Sorted Set
```

---

## 1. String

The simplest Redis data type.

```redis
SET name Ashish
GET name
```

Example:

```text
name → Ashish
```

Useful for:

* Names
* Tokens
* Counters
* Cached values
* Simple data

---

## 2. List

An ordered collection of values.

```redis
LPUSH tasks "Learn Redis"
LPUSH tasks "Learn Docker"
```

Read the list:

```redis
LRANGE tasks 0 -1
```

Useful for:

* Queues
* Tasks
* Ordered items

---

## 3. Set

A collection of **unique values**.

```redis
SADD skills Redis
SADD skills Docker
SADD skills Python
```

View the values:

```redis
SMEMBERS skills
```

Useful for:

* Unique items
* Tags
* Membership
* User groups

---

## 4. Hash

A Hash is useful for representing an object.

```redis
HSET user:1 name Ashish age 21 city Bhopal
```

Conceptually:

```text
user:1
 ├── name → Ashish
 ├── age  → 21
 └── city → Bhopal
```

Get the values:

```redis
HGETALL user:1
```

Useful for:

* User profiles
* Product information
* Objects

---

## 5. Sorted Set

A Sorted Set stores values with scores.

```redis
ZADD leaderboard 100 Ashish
ZADD leaderboard 200 Rahul
ZADD leaderboard 150 Amit
```

Conceptually:

```text
Rahul  → 200
Amit   → 150
Ashish → 100
```

Useful for:

* Leaderboards
* Rankings
* Scores
* Priority systems

---

# 🗺️ Learning Roadmap

This lab will progress from basic concepts to real-world Redis usage.

```text
                    REDIS MASTERY LAB
                           │
                           ▼
                    Redis Fundamentals
                           │
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
       Key-Value        In-Memory        Architecture
                           │
                           ▼
                      Redis CLI
                           │
                           ▼
                    Redis Data Types
                           │
        ┌──────────┬──────┼──────┬───────────┐
        ↓          ↓      ↓      ↓           ↓
      String      List   Set    Hash    Sorted Set
                           │
                           ▼
                   TTL & Expiration
                           │
                           ▼
                    Transactions
                           │
                           ▼
                       Pub/Sub
                           │
                           ▼
                       Streams
                           │
                           ▼
                       Caching
                           │
                           ▼
                    Rate Limiting
                           │
                           ▼
                    Persistence
                           │
                           ▼
                    Replication
                           │
                           ▼
                 Redis Sentinel
                           │
                           ▼
                  Redis Cluster
                           │
                           ▼
                Redis + Backend
                           │
                           ▼
                  Real-World Project
```

---

# 📂 Project Structure

```text
Redis-Mastery-Lab/
│
├── README.md
│
├── 01-fundamentals/
│   └── notes.md
│
├── 02-strings/
│   ├── commands.md
│   └── notes.md
│
├── 03-lists/
│   ├── commands.md
│   └── notes.md
│
├── 04-sets/
│   ├── commands.md
│   └── notes.md
│
├── 05-hashes/
│   ├── commands.md
│   └── notes.md
│
├── 06-sorted-sets/
│   ├── commands.md
│   └── notes.md
│
├── 07-expiration/
│   └── notes.md
│
├── 08-pub-sub/
│   └── notes.md
│
├── 09-transactions/
│   └── notes.md
│
├── 10-persistence/
│   └── notes.md
│
└── projects/
    └── ...
```

---

# 🎯 Goal of This Lab

The goal is to move from:

```text
"I know Redis commands"
```

to:

```text
"I understand Redis and know when and why to use it."
```

By the end of this lab, I want to understand:

* How Redis works
* Why Redis is fast
* Redis data structures
* Caching
* TTL and expiration
* Pub/Sub
* Transactions
* Persistence
* Queues
* Rate limiting
* Sessions
* Replication
* Redis Cluster
* Redis with backend applications
* Real-world Redis architecture

---

# 🔥 Current Progress

```text
[✅] Redis installed
[✅] Redis server running
[✅] Redis CLI working
[✅] PING / PONG
[✅] SET
[✅] GET
[ ] Lists
[ ] Sets
[ ] Hashes
[ ] Sorted Sets
[ ] TTL
[ ] Pub/Sub
[ ] Transactions
[ ] Persistence
[ ] Caching
[ ] Rate Limiting
[ ] Replication
[ ] Redis Cluster
[ ] Real-world Project
```

---

## 🚀 Philosophy

> **Learn → Build → Test → Break → Understand → Document**

Instead of only watching tutorials, every Redis concept will be practiced through commands, small experiments, and eventually real projects.

---

## 🔴 Redis Mastery Lab

**Learning Redis one concept at a time.**

```text
Learn Redis
    ↓
Understand Redis
    ↓
Build with Redis
    ↓
Master Redis
```
