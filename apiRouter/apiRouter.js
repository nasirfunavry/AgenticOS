const express = require("express");
const app = express();
const webhookRoutes = require("./webhook");
const tokensRoutes = require("./token");

app.use("/webhook", webhookRoutes);
app.use("/tokens", tokensRoutes);

module.exports = app;
