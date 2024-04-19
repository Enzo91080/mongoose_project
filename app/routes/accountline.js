const express = require("express");
const router = express();
const ctrlAccountLine = require("../controllers/accountline.js");
const auth = require("../middlewares/auth.js");

//ACTION 
router.get('/:accountId', auth, ctrlAccountLine.getAllAccountLine);
router.get("/:accountId/:lineId", auth, ctrlAccountLine.getOneAccountLine);
router.delete("/:accountId", auth, ctrlAccountLine.deleteAllAccountLine);
router.post("/:accountId", auth, ctrlAccountLine.addAccountLine);


router.put("/:lineId", auth, ctrlAccountLine.updateAccountLine);
router.delete("/:lineId", auth, ctrlAccountLine.deleteAccountLine);
module.exports = router;
