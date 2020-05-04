const express = require("express")
const { signUp, logIn } = require("../../controllers/students/auth")
const router = express.Router()

router.post("/signup/student", signUp)
router.post("/login/student", logIn)

module.exports = router;
