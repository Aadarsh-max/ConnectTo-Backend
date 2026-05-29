import Conversation from "../../models/Conversation.js";
import Message from "../../models/Message.js";

const sendMessage = async (req, res) => {
  try {
    const { receiverId, text, media } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver is required",
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [req.user._id, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, receiverId],
      });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      receiver: receiverId,
      text,
      media,
    });

    conversation.lastMessage = message._id;
    conversation.lastMessageText = text || "";
    conversation.lastMessageSender = req.user._id;

    const unreadCounts = new Map(conversation.unreadCounts);
    unreadCounts.set(
      receiverId.toString(),
      (unreadCounts.get(receiverId.toString()) || 0) + 1
    );

    conversation.unreadCounts = unreadCounts;

    await conversation.save();

    await message.populate(
      "sender",
      "username fullName profilePicture"
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default sendMessage;