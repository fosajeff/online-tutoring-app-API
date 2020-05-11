const express = require("express")
const { signUp, signUpTutor, logIn, logInTutor } = require("../controllers/auth")
const router = express.Router()

router.post("/api/v1/signup/tutor", signUpTutor)
router.post("/api/v1/signup", signUp)
router.post("/api/v1/login/tutor", logInTutor)
router.post("/api/v1/login", logIn)

module.exports = router;
