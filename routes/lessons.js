const express = require("express")
const router = express.Router()
const { createLesson, updateLesson, deleteLesson, findLesson, findOneLesson, bookLesson } = require("../controllers/lessons")
const { authenticate, authenticateByRole } = require("../_helpers/authorize")
const allowedRoles = ['admin']


router.get("/api/v1/lessons", [authenticate, authenticateByRole(allowedRoles)], findLesson)
router.get("/api/v1/lessons/:id", [authenticate, authenticateByRole(allowedRoles)], findOneLesson)
router.post("/api/v1/lessons", [authenticate, authenticateByRole(allowedRoles)], createLesson)
router.patch("/api/v1/lessons/:id", [authenticate, authenticateByRole(allowedRoles)], updateLesson)
router.delete("/api/v1/lessons/:id", [authenticate, authenticateByRole(allowedRoles)], deleteLesson)
router.post("/api/v1/lessons/book", authenticate, bookLesson)


module.exports = router
