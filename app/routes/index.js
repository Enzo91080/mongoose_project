const express = require("express");
const router = express();

const userRoutes = require("./user.js");
const accountRoutes = require("./account.js");
const accountLineRoutes = require("./accountline.js");

router.use("/auth", userRoutes);
router.use("/account", accountRoutes);
router.use("/accountline", accountLineRoutes);

module.exports = router;
