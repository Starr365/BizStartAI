const Joi = require("joi");

// Define a strict password policy:
// At least 10 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
const passwordErrorMessage = "Password must be at least 10 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&).";

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Name is required.",
  }),
  phoneNumber: Joi.string().min(10).max(15).required().messages({
    "string.empty": "Phone number is required.",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.pattern.base": passwordErrorMessage,
    "string.empty": "Password is required.",
  }),
});

const loginSchema = Joi.object({
  phoneNumber: Joi.string().required().messages({
    "string.empty": "Phone number is required to login.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required to login.",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};