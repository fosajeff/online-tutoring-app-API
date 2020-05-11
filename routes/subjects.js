const express = require("express")
const router = express.Router()
const {
  create, findAllByQuery, subjectsByCategory, subjectByCategory, updateSubject, deleteSubjectByCategory
} = require("../controllers/subjects")
const { authenticate, authenticateByRole } = require("../_helpers/authorize")
const allowedRoles = ['admin']


router.post("/api/v1/categories/:category/subjects", [authenticate, authenticateByRole(allowedRoles)], create)
router.get("/api/v1/categories/:category/subjects", authenticate, subjectsByCategory)
router.get("/api/v1/categories/:category/subjects/:id", authenticate, subjectByCategory)
router.get("/api/v1/subjects?", authenticate, findAllByQuery)
router.put("/api/v1/categories/:category/subjects/:id", [authenticate, authenticateByRole(allowedRoles)], updateSubject)
router.delete("/api/v1/categories/:category/subjects/:id", [authenticate, authenticateByRole(allowedRoles)], deleteSubjectByCategory)

module.exports = router
