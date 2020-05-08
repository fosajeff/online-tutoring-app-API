const express = require("express")
const router = express.Router()
const { findTutorsByFirstName, tutorsByCategory, registerSubject, unregisterSubject } = require("../controllers/tutors")
const { authenticate, authenticateByRole } = require("../_helper/authorize")
const allowedRoles = ['admin', 'tutor']


router.get("/categories/:id/tutors", tutorsByCategory)
// ?fname=John
router.get("/tutors?", findTutorsByFirstName)
router.put("/categories/:category/tutors", [authenticate, authenticateByRole(allowedRoles)], registerSubject)
router.delete("/categories/:category/tutors", [authenticate, authenticateByRole(allowedRoles)], unregisterSubject)
module.exports = router
