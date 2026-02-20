const rateLimit = require("express-rate-limit");
const AppError = require("../utils/AppError");

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError("Too many requests, please try again later.", 429));
  },
});

// Strict limiter for AI message endpoint
const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 message sends per 15 mins per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new AppError(
        "Too many AI requests. Please wait before sending more messages.",
        429
      )
    );
  },
});

module.exports = {
  apiLimiter,
  messageLimiter,
};
