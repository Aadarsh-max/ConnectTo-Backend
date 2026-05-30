import redis from "../config/redis.js";
import { getIO } from "../config/socket.js";

const subscriber = redis.duplicate();

const startSubscriber = async () => {
  const io = getIO();

  await subscriber.subscribe("notifications");
  await subscriber.subscribe("messages");

  subscriber.on("message", (channel, message) => {
    const data = JSON.parse(message);

    switch (channel) {
      case "notifications":
        io.to(data.recipientId).emit("newNotification", data);
        break;

      case "messages":
        io.to(data.receiverId).emit("newMessage", data);
        break;

      default:
        break;
    }
  });
};

export default startSubscriber;