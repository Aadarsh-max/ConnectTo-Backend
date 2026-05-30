import Notification from "../models/Notification.js";
import publish from "../redis/publisher.js";

const createNotification = async ({
  recipient,
  sender,
  type,
  post,
  comment,
  message,
  text,
}) => {
  const notification = await Notification.create({
    recipient,
    sender,
    type,
    post,
    comment,
    message,
    text,
  });

  await publish("notifications", {
    recipientId: recipient.toString(),
    notification,
  });

  return notification;
};

export default createNotification;