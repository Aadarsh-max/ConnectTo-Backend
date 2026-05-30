import groq from "../config/groq.js";

export const generateAIResponse = async (
  systemPrompt,
  userPrompt,
  maxTokens = 500,
) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: maxTokens,
  });

  return completion.choices[0].message.content;
};
