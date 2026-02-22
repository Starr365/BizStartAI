const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize"); // Required for OR queries
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const register = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // Check if the provided email OR phone number already exists
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

    // Search the database based on whichever identifier the user typed in
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

module.exports = { register, login };


