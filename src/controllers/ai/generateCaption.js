import { generateAIResponse } from "../../services/aiService.js";
import captionPrompt from "../../ai/prompts/captionPrompt.js";

const generateCaption = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const caption = await generateAIResponse(
      captionPrompt,
      prompt,
      300
    );

    return res.status(200).json({
      success: true,
      caption,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default generateCaption;