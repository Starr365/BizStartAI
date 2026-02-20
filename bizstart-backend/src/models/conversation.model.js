const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

const Conversation = sequelize.define("Conversation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("active", "archived"),
    defaultValue: "active",
  },

}, {
  tableName: "conversations",
  timestamps: true,
});


// 🔗 Relationship
User.hasMany(Conversation, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Conversation.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = Conversation;
