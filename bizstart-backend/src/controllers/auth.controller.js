const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize"); 
const { OAuth2Client } = require('google-auth-library'); // NEW: Import Google Auth Library
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

// Initialize the Google Client with your exact environment variable
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const existingConditions = [];
    if (email) existingConditions.push({ email });
    if (phoneNumber) existingConditions.push({ phone_number: phoneNumber });

    const existingUser = await User.findOne({
      where: {
        [Op.or]: existingConditions
      }
    });

    if (existingUser) {
      return next(new AppError("Email or Phone number is already registered", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email || null,
      phone_number: phoneNumber || null,
      password: hashedPassword,
      auth_provider: 'local'
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, phone_number: user.phone_number },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone_number,
      },
    });

  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, phoneNumber, password } = req.body;

    const searchCondition = email ? { email } : { phone_number: phoneNumber };

    const user = await User.findOne({ where: searchCondition });
    
    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    if (!user.password) {
      return next(new AppError("Please log in with Google", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, phone_number: user.phone_number },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone_number
      }
    });

  } catch (error) {
    next(error);
  }
};

// NEW: Google Login/Signup Function
const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body; // The ID token sent from the React frontend

    if (!credential) {
      return next(new AppError("Google token is required", 400));
    }

    // 1. Verify the token with Google to make sure it's real
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // 2. Check if the user already exists in your TiDB database
    let user = await User.findOne({ where: { email } });

    // 3. If they don't exist, create a new account for them instantly!
    if (!user) {
      user = await User.create({
        name: name,
        email: email,
        auth_provider: 'google' // Notice we leave password empty!
      });
    }

    // 4. Generate your own backend JWT token so they can access protected routes
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    next(new AppError("Failed to authenticate with Google", 401));
  }
};

// Make sure to export the new function!
module.exports = { register, login, googleLogin };


