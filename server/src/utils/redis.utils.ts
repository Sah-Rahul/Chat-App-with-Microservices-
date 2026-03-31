import { getRedis } from "../config/redis";

export const setCache = async (
  key: string,
  value: any,
  ttl?: number,
): Promise<void> => {
  const redis = getRedis();

  const data = JSON.stringify(value);

  if (ttl) {
    await redis.set(key, data, "EX", ttl);
  } else {
    await redis.set(key, data);
  }
};

export const getCache = async <T = any>(key: string): Promise<T | null> => {
  const redis = getRedis();

  const data = await redis.get(key);

  return data ? JSON.parse(data) : null;
};

export const deleteCache = async (key: string): Promise<void> => {
  const redis = getRedis();
  await redis.del(key);
};

export const existsCache = async (key: string): Promise<boolean> => {
  const redis = getRedis();
  const result = await redis.exists(key);
  return result === 1;
};
