const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");
const { generateAIResponse } = require("../services/ai.service");
const AppError = require("../utils/AppError");

const sendMessage = async (req, res, next) => {
  try {
    const { conversation_id, content } = req.body;

    // Joi handles required validation

    const conversation = await Conversation.findOne({
      where: {
        id: conversation_id,
        user_id: req.user.id,
      },
    });

    if (!conversation) {
      return next(
        new AppError("Conversation not found or unauthorized", 404)
      );
    }

    const userMessage = await Message.create({
      conversation_id,
      role: "user",
      content,
    });

    const aiResult = await generateAIResponse(content);

    const aiMessage = await Message.create({
      conversation_id,
      role: "assistant",
      content: aiResult.text,
      tokens_used: aiResult.tokens_used,
    });

    res.status(200).json({
      success: true,
      message: "Message processed successfully",
      data: {
        userMessage,
        aiMessage,
      },
    });

  } catch (error) {
    next(error);
  }
};

const getMessagesByConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    // ✅ Validate conversation ownership
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
        user_id: req.user.id,
      },
    });

    if (!conversation) {
      return next(new AppError("Conversation not found or unauthorized", 404));
    }

    const { count, rows } = await Message.findAndCountAll({
      where: { conversation_id: conversationId },
      order: [["createdAt", "ASC"]],
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
      },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getMessagesByConversation };




