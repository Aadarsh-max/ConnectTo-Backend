import { generateAIResponse } from "../../services/aiService.js";
import assistantPrompt from "../../ai/prompts/assistantPrompt.js";

const aiAssistant = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const response = await generateAIResponse(
      assistantPrompt,
      prompt
    );

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default aiAssistant;