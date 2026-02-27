const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

const BusinessProfile = sequelize.define("BusinessProfile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  business_stage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  business_idea: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  problem_solved: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: "business_profiles",
  timestamps: true,
});

// 🔗 Relationship: One User has One Business Profile
User.hasOne(BusinessProfile, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BusinessProfile.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = BusinessProfile;