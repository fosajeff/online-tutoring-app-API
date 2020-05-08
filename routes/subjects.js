const express = require("express")
const router = express.Router()
const {
  create, findAllByQuery, subjectsByCategory, subjectByCategory, updateSubject, deleteSubjectByCategory
} = require("../controllers/subjects")
const { authenticate, authenticateByRole } = require("../_helper/authorize")
const allowedRoles = ['admin']


router.post("/categories/:category/subjects", [authenticate, authenticateByRole(allowedRoles)], create)
router.get("/categories/:category/subjects", authenticate, subjectsByCategory)
router.get("/categories/:category/subjects/:id", authenticate, subjectByCategory)
router.get("/subjects?", authenticate, findAllByQuery)
router.put("/categories/:category/subjects/:id", [authenticate, authenticateByRole(allowedRoles)], updateSubject)
router.delete("/categories/:category/subjects/:id", [authenticate, authenticateByRole(allowedRoles)], deleteSubjectByCategory)

module.exports = router
