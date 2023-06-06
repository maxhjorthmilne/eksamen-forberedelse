const express = require("express")
const router = express.Router();

const { postQuote, filterUser, deleteQuote, updatePage, updateQuote } = require("../controllers/quoteController");
const { reqUser } = require("../middleware/reqAuth");

router.post("/quote", reqUser, postQuote);

router.get("/:username", filterUser)

router.delete("/deleteQuote/:id", reqUser, deleteQuote)

router.post("/updateQuote",reqUser, updateQuote)

router.get("/updateQuote/:id",reqUser, updatePage)


module.exports = router;
