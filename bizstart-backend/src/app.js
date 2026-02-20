const express = require("express");
const cors = require("cors");

const app = express();

//  CORS configuration (must come before routes)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

const { apiLimiter } = require("./middleware/rateLimit.middleware");

app.use("/api", apiLimiter);


// Routes
const authRoutes = require("./routes/auth.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

// Test protected route
const authenticate = require("./middleware/auth.middleware");

app.get("/api/protected", authenticate, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "BizStart AI Backend Running" });
});

//  Error handler (MUST BE LAST)
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;


