const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  password: Joi.string().min(6).required(),
}).or('email', 'phoneNumber'); // Enforces that at least ONE must be provided

const loginSchema = Joi.object({
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  password: Joi.string().required(),
}).or('email', 'phoneNumber');

module.exports = { registerSchema, loginSchema };
