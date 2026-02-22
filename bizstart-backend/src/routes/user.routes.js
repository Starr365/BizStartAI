const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const User = require("../models/user.model");
const BusinessProfile = require("../models/businessProfile.model");
const Conversation = require("../models/conversation.model");

// 1. Get basic user info
router.get("/me", authenticate, async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: { id: req.user.id, name: req.user.name, email: req.user.email } });
  } catch (error) {
    next(error);
  }
});

// 2. Save Onboarding Data (Idea, Stage, Industry)
router.post("/business-profile", authenticate, async (req, res, next) => {
  try {
    const business_stage = req.body.business_stage || req.body.businessStage;
    const business_name = req.body.business_name || req.body.businessIdea; 
    const description = req.body.description || req.body.problemSolved;
    const industry = req.body.industry;
    
    const userId = req.user.id;

    let profile = await BusinessProfile.findOne({ where: { user_id: userId } });
    
    if (profile) {
      profile = await profile.update({ 
        business_stage: business_stage, 
        business_name: business_name, 
        description: description, 
        industry: industry 
      });
    } else {
      profile = await BusinessProfile.create({ 
        user_id: userId, 
        business_stage: business_stage, 
        business_name: business_name, 
        description: description, 
        industry: industry 
      });
    }

    res.status(200).json({ success: true, message: "Profile saved successfully", data: profile });
  } catch (error) {
    next(error);
  }
});

// 3. The Dashboard Aggregator
router.get("/dashboard", authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email'] });
    const businessProfile = await BusinessProfile.findOne({ where: { user_id: userId } });
    
    let recentConversations = [];
    try {
      recentConversations = await Conversation.findAll({
        where: { user_id: userId },
        order: [['createdAt', 'DESC']],
        limit: 3
      });
    } catch (convErr) {
      console.log("No conversations found or table missing, skipping...");
    }

    res.status(200).json({
      success: true,
      data: { user, businessProfile, recentConversations }
    });
  } catch (error) {
    next(error);
  }
});

// 4. Progress Dashboard Data (NEW!)
router.get("/progress", authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    // Get the user's real name from the database
    const user = await User.findByPk(userId, { attributes: ['name'] });

    // Mock data formatted exactly for the frontend's ProgressDashboard
    const userProgress = {
      name: user ? user.name : "Entrepreneur",
      completedModules: 3,
      totalModules: 8,
      progressPercent: 37,
      summary: [
        { value: "45%", icon: "📄", label: "Business Plan" },
        { value: 12, icon: "📚", label: "Lessons Done" },
        { value: 5, icon: "🤖", label: "AI Sessions" },
      ],
      courses: [
        { title: "Understanding Your Market", description: "Learn to analyze your audience and competitors", completedLessons: 3, totalLessons: 6, duration: 35 },
        { title: "Business Strategy Basics", description: "Plan and execute your strategy effectively", completedLessons: 1, totalLessons: 4, duration: 25 },
        { title: "Marketing Essentials", description: "Learn the fundamentals of marketing", completedLessons: 2, totalLessons: 5, duration: 40 },
      ],
    };

    res.status(200).json({
      success: true,
      data: userProgress
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
