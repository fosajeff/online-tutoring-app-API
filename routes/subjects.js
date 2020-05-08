const express = require("express")
const router = express.Router()
const {
  create, findAll, findAllByQuery, findSubject, subjectsByCategory, subjectByCategory
} = require("../controllers/subjects")


router.post("/categories/:category/subjects", create)
router.get("/categories/:category/subjects", subjectsByCategory)
router.get("/categories/:category/subjects/:id", subjectByCategory)
router.get("/subjects", findAll)
router.get("/subjects?", findAllByQuery)
router.get("/subjects/:id", findSubject)

module.exports = router
