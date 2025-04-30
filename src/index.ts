import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { env } from "./config/env";
import apiRouter from "./routes";
import { scheduleTweets } from "./jobs/tweet.job";
import ejs from "ejs";
import { join } from "path";

// Create Hono app
const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use("/style.css", serveStatic({ root: "./public" }));

// Default route
app.get("/", (c) => {
  return c.json({
    message: "Hi, this is Twitter AI Agent developed by ChainGPT",
    version: "1.0.0",
    status: "running",
  });
});

app.get("/test", async (c) => {
  // First, render the dashboard content

  // Fetch from file
  const data = {};

  const dashboardContent = await ejs.renderFile(join(import.meta.dir, "../views/dashboard.ejs"), {
    title: "Dashboard",
    array: ["item1", "item2", "item3"],
    data: data,
  });

  // Then, inject it into the layout
  const html = await ejs.renderFile(join(import.meta.dir, "../views/layout.ejs"), {
    title: "Dashboard",
    body: dashboardContent,
  });

  return c.html(html);
});

// API routes
app.route("/api", apiRouter);

// Error handling middleware
app.onError((err, c) => {
  console.error("Global Error Handler:", err);

  return c.json(
    {
      success: false,
      message: "Internal Server Error",
      error: err.message,
    },
    500
  );
});

// Start the server with Bun
const port = parseInt(env.PORT);

console.log(`Starting server in ${env.NODE_ENV} mode...`);

// Start the server using Bun
Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Twitter AI Agent listening on port ${port}`);

// Start tweet scheduler
try {
  scheduleTweets();
  console.log("Tweet scheduler started successfully");
} catch (error) {
  console.error("Failed to start tweet scheduler:", error);
}
