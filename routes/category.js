const express = require("express")
const router = express.Router()
const { create, findAll, findCategory } = require("../controllers/category")
const { authenticate, authenticateByRole } = require("../_helper/authorize")
const allowedRoles = ['admin', 'tutor']



router.post("/categories", [authenticate, authenticateByRole(allowedRoles)], create)
router.get("/categories", authenticate, findAll)
router.get("/categories/:category", authenticate, findCategory)

module.exports = router
