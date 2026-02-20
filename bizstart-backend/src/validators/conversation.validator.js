const Joi = require("joi");

const createConversationSchema = Joi.object({
  title: Joi.string().min(1).required(),
});

module.exports = { createConversationSchema };
