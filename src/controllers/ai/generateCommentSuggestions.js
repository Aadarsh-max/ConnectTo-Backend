import groq from "../../config/groq.js";

const generateCommentSuggestions = async (req, res) => {
  try {
    const { postCaption } = req.body;

    if (!postCaption) {
      return res.status(400).json({
        success: false,
        message: "Post caption is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "Generate 5 short engaging social media comment suggestions for the given post.",
        },
        {
          role: "user",
          content: postCaption,
        },
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    const suggestions = completion.choices[0].message.content
      .split("\n")
      .filter((comment) => comment.trim() !== "");

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
