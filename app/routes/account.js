const express = require("express");
const router = express();
const ctrlAccount = require("../controllers/account.js");
const auth = require("../middlewares/auth.js");

router.get("/getAllAccount", auth, ctrlAccount.getAllAccount);
router.get("/:id", auth, ctrlAccount.getAccount);
router.post("/", auth, ctrlAccount.addAccount);
router.put("/:id", auth, ctrlAccount.updateAccount);
router.delete("/:id", auth, ctrlAccount.deleteAccount);

module.exports = router;
