const User = require("../models/user.model");

const getDashboardData = async (req, res, next) => {
  try {
    // The 'authenticate' middleware adds req.user automatically!
    const userId = req.user.id; 

    // Find the user in TiDB
    const user = await User.findByPk(userId, { 
      attributes: ['id', 'name', 'email', 'phone_number'] 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send it to the frontend
    res.status(200).json({
      success: true,
      data: {
        user: user
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardData };