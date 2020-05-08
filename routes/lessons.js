const express = require("express")
const router = express.Router()
const { createLesson, updateLesson, deleteLesson, findLesson, findOneLesson } = require("../controllers/lessons")
const { authenticate, authenticateByRole } = require("../_helper/authorize")
const allowedRoles = ['admin']

router.get("/lessons", [authenticate, authenticateByRole(allowedRoles)], findLesson)
router.get("/lessons/:id", [authenticate, authenticateByRole(allowedRoles)], findOneLesson)
router.post("/lessons", [authenticate, authenticateByRole(allowedRoles)], createLesson)
router.patch("/lessons/:id", [authenticate, authenticateByRole(allowedRoles)], updateLesson)
router.delete("/lessons/:id", [authenticate, authenticateByRole(allowedRoles)], deleteLesson)

module.exports = router
