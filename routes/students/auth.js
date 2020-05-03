const express = require("express")
const { signUp } = require("../../controllers/students/signup")
const { logIn } = require("../../controllers/login")
const router = express.Router()

router.post("/signup/student", signUp)
router.post("/login", logIn)

module.exports = router;
