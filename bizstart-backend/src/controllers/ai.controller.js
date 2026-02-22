// File: src/controllers/ai.controller.js

const suggestIndustry = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text prompt is required" });
    }

    // 1. The URL of the Data Science team's pipeline
    const AI_PIPELINE_URL = process.env.AI_PIPELINE_URL || "http://localhost:5000/api/predict-industry";

    // 2. Send the text to their AI pipeline
    const aiResponse = await fetch(AI_PIPELINE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text })
    });

    if (!aiResponse.ok) {
      throw new Error("AI Pipeline failed to respond");
    }

    // 3. Get the result from their pipeline
    const aiData = await aiResponse.json();
    
    // Fallback to "retail" just in case the AI returns something weird
    const suggestedIndustry = aiData.industry || "retail";

    // 4. Send the final answer back to the React frontend
    res.status(200).json({
      success: true,
      industry: suggestedIndustry
    });

  } catch (error) {
    console.error("AI Pipeline Connection Error:", error);
    // If the Data Science server is down, don't break the frontend! Just fallback.
    res.status(200).json({ 
      success: true, 
      industry: 'retail' 
    });
  }
};

module.exports = { suggestIndustry };