const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const encryptionKey = process.env.ENCRYPTION_KEY;

// Encryption settings
const algorithm = "aes-256-gcm"; // Authenticated encryption
const keyLength = 32; // 256-bit key

// Use a constant salt and IV from environment variables
const salt = Buffer.from(process.env.ENCRYPTION_SALT, "hex");
const iv = Buffer.from(process.env.IV, "hex");

// Derive a secure key from the encryption key in the environment
function deriveKey(encryptionKey) {
  return crypto.scryptSync(encryptionKey, salt, keyLength);
}

// Encrypt data
function encrypt(text, encryptionKey) {
  const key = deriveKey(encryptionKey);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${authTag}:${encrypted}`; // IV is constant, no need to include it each time
}

// Decrypt data
function decrypt(encryptedText, encryptionKey) {
  const key = deriveKey(encryptionKey);
  const [authTagHex, encrypted] = encryptedText.split(":");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

// Save tokens to a file
function saveTokens(accessToken, refreshToken, encryptionKey) {
  const tokens = {
    accessToken: encrypt(accessToken, encryptionKey),
    refreshToken: encrypt(refreshToken, encryptionKey),
  };
  fs.writeFileSync(path.join(__dirname, "tokens.json"), JSON.stringify(tokens));
}

// Load tokens from a file
function loadTokens(encryptionKey) {
  try {
    const tokens = JSON.parse(
      fs.readFileSync(path.join(__dirname, "tokens.json"))
    );
    const accessToken = decrypt(tokens.accessToken, encryptionKey);
    const refreshToken = decrypt(tokens.refreshToken, encryptionKey);
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error loading tokens:", error.message);
    return null;
  }
}

const getAcesstokenOftwitterExtra = async () => {
  let { accessToken, refreshToken } = loadTokens(encryptionKey);

  if (!accessToken) {
    throw new Error("No active Twitter authorization found.");
  }

  try {
    const response = await axios.get("https://api.twitter.com/2/users/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return accessToken;
  } catch (error) {
    console.error(
      "🚀 Twitter Token Check Error:",
      error.response?.status || error.message
    );

    if (error.response?.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await refreshAccessToken(
          refreshToken
        );
        saveTokens(newAccessToken, newRefreshToken, encryptionKey);

        return newAccessToken;
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError.message);
        throw refreshError;
      }
    }

    throw error;
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    console.log("refreshing access token");
    const base64Credentials = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    const response = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );

    console.log("refreshed access token");

    return {
      newAccessToken: response.data.access_token,
      newRefreshToken: response.data.refresh_token,
    };
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getTextForTweet = async (prompt) => {
  try {
    const response = await axios.post(
      `${process.env.WEB_URL}/tweet-generator`,
      {
        prompt,
      },
      {
        headers: {
          "api-key": process.env.API_KEY,
        },
      }
    );
    return response.data.tweet;
  } catch (error) {
    console.error("Error fetching tweet text:", error.message);
    throw new Error(`Error generating content: ${error.message}`);
  }
};

const postTweet = async (accessToken, message) => {
  const url = "https://api.twitter.com/2/tweets";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, { text: message }, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error posting tweet:",
      error.response?.data || error.message
    );
    throw new Error(`Failed to post tweet: ${error.message}`);
  }
};

const uploadTwitterPostTweet = async (message) => {
  console.log("🚀 Posting Tweet:", message);

  let accessToken;
  try {
    accessToken = await getAcesstokenOftwitterExtra();
    await postTweet(accessToken, message);
  } catch (error) {
    console.error("Failed to upload tweet:", error.message);
    throw error;
  }
};

const generateAndPostTweet = async (prompt) => {
  try {
    if (!prompt) {
      throw new Error("prompt is required");
    }

    let tweet = await getTextForTweet(prompt);
    tweet = tweet.length > 270 ? tweet.substring(0, 270) + "..." : tweet;
    await uploadTwitterPostTweet(tweet);
  } catch (error) {
    console.error("error in posting tweet", error);
  }
};

module.exports = { generateAndPostTweet, uploadTwitterPostTweet, saveTokens };
