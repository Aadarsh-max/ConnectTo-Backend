import redis from "../config/redis.js";

const publish = async (channel, data) => {
  await redis.publish(channel, JSON.stringify(data));
};

export default publish;