const express = require("express");
const router = express();
const ctrlUser = require("../controllers/user");

router.get("/signup", ctrlUser.signup);
router.get("/login", ctrlUser.login);

module.exports = router;
