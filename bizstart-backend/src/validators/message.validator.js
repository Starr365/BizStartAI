const Joi = require("joi");

const sendMessageSchema = Joi.object({
  conversation_id: Joi.number().required(),
  content: Joi.string().min(1).required(),
});

module.exports = { sendMessageSchema };
