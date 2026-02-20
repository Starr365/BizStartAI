const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const { sendMessage, getMessagesByConversation } = require("../controllers/message.controller");
const validate = require("../middleware/validate.middleware");
const { sendMessageSchema } = require("../validators/message.validator");
const { messageLimiter } = require("../middleware/rateLimit.middleware");

router.post(
  "/",
  authenticate,
  messageLimiter, // AI protection
  validate(sendMessageSchema),
  sendMessage
);

router.get(
  "/:conversationId",
  authenticate,
  getMessagesByConversation
);

module.exports = router;

