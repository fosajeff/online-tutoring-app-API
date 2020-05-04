const express = require("express")
const { signUp, logIn } = require("../../controllers/tutors/auth")
const router = express.Router()

router.post("/signup/tutor", signUp)
router.post("/login/tutor", logIn)

module.exports = router;
