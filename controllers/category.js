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
      let exist = await Category.findOne({ category_name })
      if (!exist) {
        const category = await Category.create({ category_name })
        await category.save()
        res.json(category)
      }
      res.status(423)
      .send({
        message: `Category with name ${category_name} already exist`,
      })
    } catch (e) {
      console.log(e)
    }
  },

  // GET /categories
  findAll: async (req, res) => {
    try {
      const category = await Category.find().populate("subjects")
      res.json(category)

    } catch (e) {
      console.log(e)
    }
  },

  // GET /categories/:category
  findCategory: async (req, res) => {
    try {
      const { category } = req.params
      const getCategory = await Category.findOne({ category_name: category }).populate("subjects")
      return res.json(getCategory)
    } catch (e) {
      console.log(e)
    }
  },

}
