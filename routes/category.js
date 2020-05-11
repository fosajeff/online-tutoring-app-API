const express = require("express")
const router = express.Router()
const { create, findAll, findCategory, deleteCategory, updateCategory } = require("../controllers/category")
const { authenticate, authenticateByRole } = require("../_helpers/authorize")
const allowedRoles = ['admin']



router.post("/api/v1/categories", [authenticate, authenticateByRole(allowedRoles)], create)
router.get("/api/v1/categories", authenticate, findAll)
router.get("/api/v1/categories/:category", authenticate, findCategory)
router.put("/api/v1/categories/:category", [authenticate, authenticateByRole(allowedRoles)], updateCategory)
router.delete("/api/v1/categories/:category", [authenticate, authenticateByRole(allowedRoles)], deleteCategory)

module.exports = router
