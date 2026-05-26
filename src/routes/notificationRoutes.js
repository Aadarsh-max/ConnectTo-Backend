import express from "express";
import protect from "../middleware/authMiddleware.js";
import getNotifications from "../controllers/notification/getNotifications.js";
import markAsRead from "../controllers/notification/markAsRead.js";
import clearNotifications from "../controllers/notification/clearNotifications.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.patch("/:notificationId/read", protect, markAsRead);
router.delete("/clear", protect, clearNotifications);

export default router;