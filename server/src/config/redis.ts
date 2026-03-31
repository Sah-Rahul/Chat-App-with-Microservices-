import Redis from "ioredis";

let redis: Redis | null = null;

export const connectRedis = async () => {
  const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

  redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
  });

  redis.on("connect", () => console.log("✅ Redis connected"));
  redis.on("error", (err) => console.log("❌ Redis error:", err));

  return redis;
};

export const getRedis = () => {
  if (!redis) throw new Error("Redis not initialized");
  return redis;
};
