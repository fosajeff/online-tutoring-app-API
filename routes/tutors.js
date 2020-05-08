const express = require("express")
const router = express.Router()
const { findTutorsByFirstName, tutorsByCategory, registerSubject, unregisterSubject} = require("../controllers/tutors")
const { authenticate, authenticateByRole, makeTutorAdmin, removeAdmin, activateTutor, deactivateTutor } = require("../_helper/authorize")
const allowedRoles = ['admin', 'tutor']
const allowed = ['admin']


router.get("/categories/:id/tutors", tutorsByCategory)
// ?fname=John
router.get("/tutors?", findTutorsByFirstName)
router.put("/categories/:category/tutors", [authenticate, authenticateByRole(allowedRoles)], registerSubject)
router.delete("/categories/:category/tutors", [authenticate, authenticateByRole(allowedRoles)], unregisterSubject)
router.put("/tutors/:id", [authenticate, authenticateByRole(allowed)], makeTutorAdmin)
router.delete("/tutors/:id", [authenticate, authenticateByRole(allowed)], removeAdmin)
router.put("/tutors/:id/activate", [authenticate, authenticateByRole(allowed)], activateTutor)
router.put("/tutors/:id/deactivate", [authenticate, authenticateByRole(allowed)], deactivateTutor)

module.exports = router
