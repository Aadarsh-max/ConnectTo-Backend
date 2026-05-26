import express from "express";
import protect from "../middleware/authMiddleware.js";
import sendMessage from "../controllers/message/sendMessage.js";
import getMessages from "../controllers/message/getMessages.js";
import deleteMessage from "../controllers/message/deleteMessage.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:conversationId", protect, getMessages);
router.delete("/:messageId", protect, deleteMessage);

export default router;