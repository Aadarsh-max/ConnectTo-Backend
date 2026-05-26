import express from "express";
import protect from "../middleware/authMiddleware.js";
import addComment from "../controllers/comment/addComment.js";
import deleteComment from "../controllers/comment/deleteComment.js";
import getComments from "../controllers/comment/getComments.js";

const router = express.Router();

router.post("/:postId", protect, addComment);
router.get("/:postId", protect, getComments);
router.delete("/:commentId", protect, deleteComment);

export default router;