const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Conversation = require("./conversation.model");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  role: {
    type: DataTypes.ENUM("user", "assistant"),
    allowNull: false,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  tokens_used: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }

}, {
  tableName: "messages",
  timestamps: true,
});


// 🔗 Relationship
Conversation.hasMany(Message, {
  foreignKey: "conversation_id",
  onDelete: "CASCADE",
});

Message.belongsTo(Conversation, {
  foreignKey: "conversation_id",
});

module.exports = Message;
