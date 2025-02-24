const cron = require("node-cron");
const path = require("path");
const fs = require("fs");
const { generateAndPostTweet } = require("../services/twitterService");

const configPath = path.join(__dirname, "../schedule.json");

function loadConfig() {
  try {
    const data = fs.readFileSync(configPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading schedule config:", error);
    return {};
  }
}

function scheduleTweets() {
  const config = loadConfig();
  for (const time in config) {
    const prompt = config[time];
    const [hour, minute] = time.split(":");

    cron.schedule(
      `${minute} ${hour} * * *`,
      () => {
        console.log(`Running scheduled tweet for UTC time: ${time}`);
        generateAndPostTweet(prompt);
      },
      {
        timezone: "UTC",
      }
    );
  }
}

module.exports = { scheduleTweets };
