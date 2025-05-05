import { Hono } from "hono";
import {
  registerWebhook,
  tweetWebhook,
  renderLiveNews,
  subscribeToCategories,
} from "../controllers/webhook.controller";

// Create a Hono router for webhook routes
const router = new Hono();

// Register webhook routes
router.post("/", tweetWebhook); // Webhook Listener
router.post("/register", registerWebhook); // Webhook Registration
router.get("/live-news", renderLiveNews); // Live News Page
router.post("/categories/subscribe", subscribeToCategories); // Subscribe to Categories

export default router;
