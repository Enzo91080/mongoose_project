const express = require("express");
require("./app/models/index.js");
const router = require("./app/routes/index.js");

const app = express();

app.use("/api", router);

module.exports = app;
  