import redis from "../config/redis.js";

const publishNotification = async (notification) => {
  await redis.publish(
    "notifications",
    JSON.stringify(notification)
  );
};

export default publishNotification;