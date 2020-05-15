const express = require("express")
const router = express.Router()
const { findTutorsByFirstName, tutorsByCategory, registerSubject, unregisterSubject} = require("../controllers/tutors")
const { authenticate, authenticateByRole, makeTutorAdmin, removeAdmin, activateTutor, deactivateTutor } = require("../_helpers/authorize")
const allowedRoles = ['admin', 'tutor']
const allowed = ['admin']


router.get("/api/v1/categories/:category/tutors", tutorsByCategory)
router.get("/api/v1/tutors?", findTutorsByFirstName)
router.put("/api/v1/categories/:category/subjects/:subject/register", [authenticate, authenticateByRole(allowedRoles)], registerSubject)
router.put("/api/v1/categories/:category/subjects/:subject/unregister", [authenticate, authenticateByRole(allowedRoles)], unregisterSubject)
router.put("/api/v1/tutors/:id", [authenticate, authenticateByRole(allowed)], makeTutorAdmin)
router.delete("/api/v1/tutors/:id", [authenticate, authenticateByRole(allowed)], removeAdmin)
router.put("/api/v1/tutors/:id/activate", [authenticate, authenticateByRole(allowed)], activateTutor)
router.put("/api/v1/tutors/:id/deactivate", [authenticate, authenticateByRole(allowed)], deactivateTutor)

module.exports = router
