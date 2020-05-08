const express = require("express")
const router = express.Router()
const {
  create, findAllByQuery, subjectsByCategory, subjectByCategory, updateSubject
} = require("../controllers/subjects")


router.post("/categories/:category/subjects", create)
router.get("/categories/:category/subjects", subjectsByCategory)
router.get("/categories/:category/subjects/:id", subjectByCategory)
router.get("/subjects?", findAllByQuery)
router.put("/categories/:category/subjects/:id", updateSubject)

module.exports = router
