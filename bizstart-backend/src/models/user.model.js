const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true, // Changed: Optional because manual signups use phone numbers
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  phone_number: {
    type: DataTypes.STRING,
    allowNull: true, // Added: Optional because Google signups only give emails
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true, // Changed: Optional because Google users don't have passwords
  },

  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },

  auth_provider: {
    type: DataTypes.ENUM('local', 'google', 'apple'), // Added: Tracks how they created the account
    defaultValue: 'local'
  }
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;
