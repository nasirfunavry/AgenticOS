require("dotenv").config();
const express = require("express");
const { scheduleTweets } = require("./jobs/postTweetJob");
const apiRoutes = require("./apiRouter/apiRouter");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("Hi, this is Twitter AI Agent developed by ChainGPT");
});

app.use("/api", apiRoutes);

scheduleTweets();
console.log("Tweet scheduler started.");

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    status: err.status || 500,
  });
});

app.listen(port, () => {
  console.log(`🚀 Twitter AI Agent listening on port ${port}`);
});
