const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const { createConversationSchema } = require("../validators/conversation.validator");

const {
  createConversation,
  getUserConversations,
  getSingleConversation,
} = require("../controllers/conversation.controller");

router.post("/", authenticate, createConversation);
router.get("/", authenticate, getUserConversations);
router.get("/:id", authenticate, getSingleConversation);

module.exports = router;
