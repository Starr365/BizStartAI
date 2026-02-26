const axios = require("axios");

const generateAIResponse = async (messages) => {
  try {
    // If AI service is not configured → fallback
    if (!process.env.AI_SERVICE_URL) {
      return {
        text: `Mock AI response to: "${messages[messages.length - 1].content}"`,
        tokens_used: null,
      };
    }

    // 1. We append the exact endpoint from the Data Science docs
    const aiEndpoint = `${process.env.AI_SERVICE_URL}/api/query/`;

    // 2. We extract the latest user message to match their "question" format
    const userQuestion = messages[messages.length - 1].content;

    const response = await axios.post(
      aiEndpoint,
      { question: userQuestion }, // Formatted exactly how Data Science wants it
      {
        headers: {
          "Content-Type": "application/json",
          ...(process.env.AI_SERVICE_KEY && {
            Authorization: `Bearer ${process.env.AI_SERVICE_KEY}`,
          }),
        },
        timeout: 15000,
      }
    );

    // 3. We map their "answer" field back to the frontend
    return {
      text: response.data.answer || "Sorry, the AI did not return an answer.",
      tokens_used: null, 
    };

  } catch (error) {
    console.error("AI Service error:", error.response?.data || error.message);
    throw new Error("AI service unavailable");
  }
};

module.exports = { generateAIResponse };



