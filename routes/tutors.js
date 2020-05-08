const express = require("express")
const router = express.Router()
const { findTutorsByFirstName, tutorsByCategory } = require("../controllers/tutors")
const { authenticate, authenticateByRole } = require("../_helper/authorize")
const allowedRoles = ['admin', 'tutor']


router.get("/categories/:id/tutors", tutorsByCategory)
// ?fname=John
router.get("/tutors?", findTutorsByFirstName)

module.exports = router
