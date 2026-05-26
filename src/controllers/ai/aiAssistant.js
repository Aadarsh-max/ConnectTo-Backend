import groq from "../../config/groq.js";

const aiAssistant = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant for a social media platform called ConnectTo. Help users with captions, hashtags, engagement tips, profiles, posts, and platform guidance.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return res.status(200).json({
      success: true,
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default aiAssistant;
