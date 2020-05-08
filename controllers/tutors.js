const User = require("../models/tutors")
const Category = require("../models/category")


// GET /tutors?fname=:id
module.exports = {

  findTutorsByFirstName: async (req, res) => {
    const { fname } = req.query
    console.log(fname);
    const tutors = await User.find({ first_name: fname, first_name: 1, last_name: 1 })
    if (!tutors) {
      res.send({message: `No tutors with name ${fname}`})
    }
    return res.json(tutors)
  },

  // GET /categories/:id/tutors
  tutorsByCategory: async (req, res) => {
    const { id } = req.params
    const category = await Category.find({ category_name: id }).populate("tutors")

    return res.json(category.tutors)
  },
}
