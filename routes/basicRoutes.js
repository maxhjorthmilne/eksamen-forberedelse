const express = require("express")
const router = express.Router();

const { home, userHome, ifHome, hjelp } = require("../controllers/basicControllers")

router.get("/", home)

router.get("/hjelp", hjelp)

router.get("/home/:username",ifHome, userHome)


module.exports = router;