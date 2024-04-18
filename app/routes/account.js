const express = require("express");
const router = express();
const ctrlAccount = require("../controllers/account.js");

router.get("/", ctrlAccount.getAccount);
router.post("/", ctrlAccount.addAccount);
router.put("/:id", ctrlAccount.updateAccount);
router.delete("/:id", ctrlAccount.deleteAccount);

module.exports = router;
