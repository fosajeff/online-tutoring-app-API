const Tutor = require("../models/tutors")
const Category = require("../models/category")
const Subject = require("../models/subjects")


// GET /tutors?fname=:id
module.exports = {

  findTutorsByFirstName: async (req, res) => {
    const { fname } = req.query
    const tutors = await Tutor.find({ first_name: fname}).sort({ first_name: 1, last_name: 1 })
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

  // PUT /categories/:category/tutors
  registerSubject: async (req, res) => {
    const { category } = req.params
    const { tutor, subject } = req.body

    if (!tutor || !subject) {
      res.status(400).send({
        message: "All fields are required",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    try {
      let exist = await Subject.findOne({ name: subject }) && await Category.findOne({ category_name: category})
      if (exist) {

        const tutor_parts = tutor.split(' ')
        let first_name = tutor_parts[0]
        let last_name = tutor_parts[1]
        const data = await Tutor.findOne({first_name, last_name}).populate("category")
        if (data === null) {
          return res.status(404).json({
            message: `Tutor with name ${tutor} does not exist`,
          })
        }
        if (data.subjects.includes(subject)) {
          return res.status(423).send({
            message: `You already registered ${subject}`,
          })
        }
        // add tutor to category
        const set_category = await Category.findOne({ category_name: category})
        set_category.tutors.push(tutor_parts)
        await set_category.save()
        data.subjects.push(subject)
        data.category.push(category)
        await data.save()
        return res.json(data)
      }
      return res.status(404).json({
        message: `Subject with name ${subject} in ${category} category does not exist`,
      })
    } catch (e) {
      console.log(e)
    }
  },


  // DELETE /categories/:category/tutors
  unregisterSubject: async (req, res) => {
    const { category } = req.params
    const { tutor, subject } = req.body
    if (!tutor || !subject) {
      res.status(400).send({
        message: "All fields are required",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    try {
      const subj = Subject.find({ name: subject, category: category })
      if (subj === null) {
        return res.status(404).json({
          message: `Subject with name ${subject} in ${category} category does not exist`,
        })
      }
      const tutor_parts = tutor.split(' ')
      let first_name = tutor_parts[0]
      let last_name = tutor_parts[1]
      const data = await Tutor.findOne({first_name, last_name})
      if (data === null) {
        return res.status(404).json({
          message: `Tutor with name ${req.user.first_name} ${last_name} does not exist`,
        })
      }
      // remove tutor from category
      const set_category = await Category.findOne({ category_name: category})
      let inde = set_category.tutors.indexOf(tutor_parts)
      set_category.splice(inde, 1)
      await set_category.save()
      let i = data.subjects.indexOf(subject)
      data.subjects.splice(i, 1)
      let ind = data.category.indexOf(category)
      data.category.splice(ind, 1)
      await data.save()
      return res.json(data)
    } catch (e) {
      console.log(e)
    }
  },
}
