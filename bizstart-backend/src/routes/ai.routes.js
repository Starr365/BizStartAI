const express = require("express");
const router = express.Router();
// NEW: Import authenticate middleware so we know who is chatting
const authenticate = require("../middleware/auth.middleware");

// 1. AI Industry Suggestion (Used during Onboarding)
router.post("/suggest-industry", async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text prompt is required" });
    }

    const AI_URL = process.env.AI_SERVICE_URL || "https://biz-start-ai-rust.vercel.app";
    
    const strictQuestion = `${text}. Based on these details, pick the best industry ID from this exact list: beauty, retail, small-scale, service, fashion. Return ONLY the word of the ID. No sentences. No punctuation.`;

    const dsResponse = await fetch(`${AI_URL}/api/query/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        question: strictQuestion 
      })
    });

    if (!dsResponse.ok) {
      throw new Error(`Data Science pipeline rejected the request: ${dsResponse.status}`);
    }

    const dsData = await dsResponse.json();

    let finalIndustry = dsData.answer ? dsData.answer.trim().toLowerCase() : "retail";

    const validIndustries = ['beauty', 'retail', 'small-scale', 'service', 'fashion'];
    if (!validIndustries.includes(finalIndustry)) {
      finalIndustry = 'retail';
    }

    res.status(200).json({ 
      success: true, 
      industry: finalIndustry 
    });

  } catch (error) {
    console.error("AI Pipeline Communication Error:", error);
    res.status(200).json({ success: true, industry: "retail" }); 
  }
});

// 2. AI Mentor Chat Endpoint (NEW!)
router.post("/chat", authenticate, async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message text is required" });
    }

    const AI_URL = process.env.AI_SERVICE_URL || "https://biz-start-ai-rust.vercel.app";
    
    // Forward the user's message using the exact format the DS documentation requires
    const dsResponse = await fetch(`${AI_URL}/api/query/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        question: message 
      })
    });

    if (!dsResponse.ok) {
      throw new Error(`Data Science pipeline rejected the request: ${dsResponse.status}`);
    }

    const dsData = await dsResponse.json();

    // The DS API returns the AI's response inside the "answer" key
    const aiReplyText = dsData.answer || "I'm sorry, I seem to be having trouble processing that right now.";

    // Send the final AI reply back to the React frontend
    res.status(200).json({ 
      success: true, 
      reply: aiReplyText 
    });

  } catch (error) {
    console.error("AI Chat Communication Error:", error);
    res.status(500).json({ 
      success: false, 
      reply: "I'm having trouble connecting to my servers. Please try again in a moment!" 
    }); 
  }
});

module.exports = router;