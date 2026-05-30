import redis from "../config/redis.js";

export const setCache = async (
  key,
  value,
  expiry = 3600
) => {
  await redis.set(
    key,
    JSON.stringify(value),
    "EX",
    expiry
  );
};

export const getCache = async (key) => {
  const data = await redis.get(key);

  return data ? JSON.parse(data) : null;
};

export const deleteCache = async (key) => {
  await redis.del(key);
};