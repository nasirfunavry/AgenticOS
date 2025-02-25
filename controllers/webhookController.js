const axios = require("axios");
const { uploadTwitterPostTweet } = require("../services/twitterService");

//api to register webhook with chaingpt
const registerWebhook = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      throw new Error("url is required");
    }
    const response = await axios.post(
      `${process.env.WEB_URL}/webhook-subscription/register`,
      {
        url,
      },
      {
        headers: {
          "api-key": process.env.API_KEY,
        },
      }
    );
    // return response.data;
    res.send({
      message: "webhook registered successfully",
      response: response.data,
    });
  } catch (err) {
    console.log(`error registering webhook ${err}`);
    next(err);
  }
};

// webhook to receive tweet and publish it
const tweetWebhook = async (req, res, next) => {
  try {
    const { tweet } = req.body;
    if (!tweet) {
      throw new Error("tweet is required");
    }

    await uploadTwitterPostTweet(tweet);
    res.send({ message: "tweeted successfully", tweet });
  } catch (err) {
    console.log(`error posting tweet using webhook ${err}`);
    next(err);
  }
};

module.exports = { registerWebhook, tweetWebhook };
