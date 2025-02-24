const { saveTokens } = require("../services/twitterService");

const loadTokens = async (req, res, next) => {
  try {
    const encryptionKey = process.env.ENCRYPTION_KEY;
    const { accessToken, refreshToken } = req.body;
    if (!accessToken || !refreshToken) {
      throw new Error("accessToken & refreshToken are required");
    }
    saveTokens(accessToken, refreshToken, encryptionKey);
    res.send({
      message: "tokens saved",
    });
  } catch (err) {
    console.log(`error registering webhook ${err}`);
    next(err);
  }
};

module.exports = { loadTokens };
