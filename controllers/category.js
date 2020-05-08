const Category = require("../models/category")

module.exports = {

  // POST /categories
  create: async (req, res) => {
    try {
      const category_name = req.body.category_name
      if (!category_name) {
        res.status(400).send({
          message: "Invalid field name",
          documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
        })
      }
      const category = await Category.create({ category_name })
      await category.save()
      res.json(category)
    } catch (e) {
      console.log(e)
    }
  },

  // GET /categories
  findAll: async (req, res) => {
    try {
      const category = await Category.find()
      res.json(category)

    } catch (e) {
      console.log(e)
    }
  },

  // GET /categories/:category
  findCategory: async (req, res) => {
    try {
      const { category } = req.params
      const getCategory = await Category.findOne({ category_name: category })
      return res.json(getCategory)
    } catch (e) {
      console.log(e)
    }
  },

}
