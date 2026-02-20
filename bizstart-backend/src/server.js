require("dotenv").config();
const app = require("./app"); // your express app
const sequelize = require("./config/database");
require("./models/user.model");
require("./models/conversation.model");
require("./models/message.model");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log(" Database connected successfully.");

    // Sync models (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log(" Database synced.");

    // Start server
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" Failed to start server:", error);
  }
}

startServer();

