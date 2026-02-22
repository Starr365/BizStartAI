const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { register, login } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

// Standard Local Routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// New Google Auth Route
router.post("/google", async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: "Google access token is required" });
    }

    // 1. Verify token with Google
    const googleResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!googleResponse.ok) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const googleUser = await googleResponse.json();

    // 2. Check if the user already exists in your TiDB database
    let user = await User.findOne({ where: { email: googleUser.email } });

    // 3. Create account if they don't exist
    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        auth_provider: 'google',
      });
    }

    // 4. Generate backend JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    // 5. Send response to frontend
    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      data: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Internal server error during Google login" });
  }
});

module.exports = router;

