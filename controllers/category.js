const Category = require("../models/category")
const Subject = require("../models/subjects")

module.exports = {

  // POST /categories
  create: async (req, res) => {
    try {
      const category_name = req.body.category_name
      if (!category_name) {
        res.status(400).send({
          message: "Invalid field name",
          documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
        })
      }
      let exist = await Category.findOne({ category_name })
      if (!exist) {
        const category = await Category.create({ category_name })
        await category.save()
        res.json(category)
      }
      return res.status(423)
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
      const category = await Category.find({}, {_id:0, __v: 0}).populate("subjects")
      res.json(category)

    } catch (e) {
      console.log(e)
    }
  },

  // GET /categories/:category
  findCategory: async (req, res) => {
    try {
      const { category } = req.params
      const getCategory = await Category.findOne({ category_name: category }, {_id:0, __v: 0}).populate("subjects")
      return res.json(getCategory)
    } catch (e) {
      console.log(e)
    }
  },

  // PUT /categories/:category
  updateCategory: async (req, res) => {
    const { category } = req.params
    const { category_name } = req.body

    try {
      const updateCategoryName = await Category.findOneAndUpdate({ category_name: category }, { category_name })
      if (updateCategoryName === null) {
        return res.status(404)
        .send({
          message: `Category with name ${category} does not exist`,
        })
      }
      await updateCategoryName.save()
      return res.json({message: "Update Successful"})
    } catch (e) { console.log(e) }
},

  // DELETE /categories/:category
  deleteCategory: async (req, res) => {
    const category = Category.findOne({ category_name: req.params.category })
    if (!category) {
      return res.status(404).json({message: `Category with name ${req.params.category} not found`})
    }
    try {
      category.remove(function(err) {
        if (!err) {
          Subject.update({_id: {$in: category.subjects}}, {$pull: {category: req.params.category}}, function (err, numberAffected) {
            return res.json({message: `${numberAffected.ok} category deleted`})
          })
        } else {
          console.log(err);
        }
      })
    } catch(e) { console.log(e) }
  }
}
