const Conversation = require("../models/conversation.model");
const AppError = require("../utils/AppError");

const createConversation = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Joi handles required validation

    const conversation = await Conversation.create({
      title,
      user_id: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      data: conversation,
    });

  } catch (error) {
    next(error);
  }
};

const getUserConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.findAll({
      where: { user_id: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: conversations,
    });

  } catch (error) {
    next(error);
  }
};

const getSingleConversation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
    });

    if (!conversation) {
      return next(new AppError("Conversation not found", 404));
    }

    res.status(200).json({
      success: true,
      data: conversation,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  getUserConversations,
  getSingleConversation,
};
