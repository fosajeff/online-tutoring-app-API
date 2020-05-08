const express = require("express")
const { signUp, signUpTutor, logIn, logInTutor } = require("../controllers/auth")
const router = express.Router()

router.post("/signup/tutor", signUpTutor)
router.post("/signup", signUp)
router.post("/login/tutor", logInTutor)
router.post("/login", logIn)

module.exports = router;
