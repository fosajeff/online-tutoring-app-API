const express = require("express")
const router = express.Router()
const { create, findAll, findCategory, deleteCategory, updateCategory } = require("../controllers/category")
const { authenticate, authenticateByRole } = require("../_helper/authorize")
const allowedRoles = ['admin']



router.post("/categories", [authenticate, authenticateByRole(allowedRoles)], create)
router.get("/categories", authenticate, findAll)
router.get("/categories/:category", authenticate, findCategory)
router.put("/categories/:category", [authenticate, authenticateByRole(allowedRoles)], updateCategory)
router.delete("/categories/:category", [authenticate, authenticateByRole(allowedRoles)], deleteCategory)

module.exports = router
