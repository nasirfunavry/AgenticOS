const express = require("express");
const { loadTokens } = require("../controllers/tokenController");

const router = express.Router();

router.post("/", loadTokens);

module.exports = router;
