const express = require("express");
const {
  registerWebhook,
  tweetWebhook,
} = require("../controllers/webhookController");

const router = express.Router();

router.post("/register", registerWebhook);
router.post("/", tweetWebhook);

module.exports = router;
