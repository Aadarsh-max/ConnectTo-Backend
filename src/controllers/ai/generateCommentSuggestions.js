import { generateAIResponse } from "../../services/aiService.js";
import commentPrompt from "../../ai/prompts/commentPrompt.js";

const generateCommentSuggestions = async (req, res) => {
  try {
    const { postCaption } = req.body;

    if (!postCaption) {
      return res.status(400).json({
        success: false,
        message: "Post caption is required",
      });
    }

    const response = await generateAIResponse(commentPrompt, postCaption, 200);

    const suggestions = response
      .split("\n")
      .map((comment) => comment.trim())
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      suggestions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default generateCommentSuggestions;
