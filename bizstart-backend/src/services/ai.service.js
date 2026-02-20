// src/services/ai.service.js
const axios = require("axios");

const generateAIResponse = async (prompt) => {
  try {
    // If AI_SERVICE_URL exists, call real AI service
    if (process.env.AI_SERVICE_URL) {
      const response = await axios.post(
        process.env.AI_SERVICE_URL,
        { prompt },
        {
          headers: process.env.HF_API_KEY
            ? {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
              }
            : {},
        }
      );

      return {
        text: response.data.text || response.data.generated_text,
        tokens_used: prompt.length,
      };
    }

    // Fallback mock (development mode)
    return {
      text: `AI response to: "${prompt}"`,
      tokens_used: prompt.length,
    };

  } catch (error) {
    throw new Error("AI service unavailable");
  }
};

module.exports = { generateAIResponse };

