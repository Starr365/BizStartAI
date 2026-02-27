const express = require("express");
const router = express.Router();

// Middleware & Validators
const validate = require("../middleware/validate.middleware");
const { authLimiter } = require("../middleware/rateLimit.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

// Controllers (Imported ONCE)
const { register, login, googleLogin } = require("../controllers/auth.controller");

// Standard Local Routes
router.post("/register", validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login); // Applied authLimiter here!

// Google Auth Route (Logic is cleanly handled inside the controller)
router.post("/google", googleLogin);

module.exports = router;

