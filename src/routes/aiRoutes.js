import express from "express";
import protect from "../middleware/authMiddleware.js";
import generateCaption from "../controllers/ai/generateCaption.js";
import generateCommentSuggestions from "../controllers/ai/generateCommentSuggestions.js";
import aiAssistant from "../controllers/ai/aiAssistant.js";

const router = express.Router();

router.post("/caption", protect, generateCaption);
router.post("/comments", protect, generateCommentSuggestions);
router.post("/assistant", protect, aiAssistant);

export default router;