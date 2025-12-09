const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");

// Routers
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const feedRouter = require("./routes/feed");

// CORS (must be first)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Register routes BEFORE starting server
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/feed", feedRouter);  // <-- ONLY ONE FEED ROUTE HERE

// Start server after DB connects
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7272, () => {
      console.log('Server is running on port 7272');
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

module.exports = app;


