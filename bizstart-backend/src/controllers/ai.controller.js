// File: src/controllers/ai.controller.js

const suggestIndustry = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text prompt is required" });
    }

    // 1. Check for the API Key
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing. Falling back to default.");
      return res.status(200).json({ success: true, industry: "retail" });
    }

    // 2. The Prompt: Force Gemini to act as a strict classifier
    const prompt = `You are a strict business classification AI. Read the following business description and categorize it into ONE single word representing the industry (e.g., retail, technology, agriculture, beauty, food, finance). Return ONLY the single word in lowercase, with no punctuation or extra text.\n\nDescription: "${text}"`;

    // 3. Call the Google Gemini API directly
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!geminiResponse.ok) {
      throw new Error("Gemini API request failed");
    }

    const data = await geminiResponse.json();
    
    // 4. Extract the text and clean it up (remove spaces/punctuation)
    let suggestedIndustry = data.candidates[0].content.parts[0].text.trim().toLowerCase();
    suggestedIndustry = suggestedIndustry.replace(/[^a-z]/g, ''); // Ensure it's just letters

    // 5. Send the predicted industry back to the React frontend
    res.status(200).json({
      success: true,
      industry: suggestedIndustry || "retail"
    });

  } catch (error) {
    console.error("Gemini AI Connection Error:", error.message);
    // If the API fails or hits a rate limit, don't break the frontend! Just fallback.
    res.status(200).json({ 
      success: true, 
      industry: 'retail' 
    });
  }
};

module.exports = { suggestIndustry };