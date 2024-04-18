const express = require("express");
const router = express();
const ctrlAccountLine = require("../controllers/accountline.js");


router.get('/getAllAccountLine', ctrlAccountLine.getAll);
router.get("/:id", ctrlAccountLine.getAccountLine);
router.post("/", ctrlAccountLine.addAccountLine);
router.put("/:id", ctrlAccountLine.updateAccountLine);
router.delete("/:id", ctrlAccountLine.deleteAccountLine);
module.exports = router;
