const express = require("express");
const cors = require("cors");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman or mobile apps)
      if (!origin) return callback(null, true);

      // Allow specific frontend URL if set
      if (process.env.FRONTEND_URL) {
        if (origin === process.env.FRONTEND_URL) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      }

      // If no FRONTEND_URL is set (development), allow all
      return callback(null, true);
    },
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

const userRoutes = require("./routes/user.routes");
const aiRoutes = require("./routes/ai.routes");


app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

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


