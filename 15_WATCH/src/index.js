import express from 'express';
import Redis from "ioredis";

const app = express();


const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

await redis.set("balance", 1000);
await redis.watch("balance");

const balance = Number(await redis.get("balance"));

if (balance >= 100){
    const transaction = redis.multi();
    transaction.decrby("balance", 100);
    transaction.incrby("balance", 100);

    const result = await transaction.exec();
    console.log(result);

}else{
   await redis.unwatch();
   console.log("Insufficient balance");



}

await redis.quit();