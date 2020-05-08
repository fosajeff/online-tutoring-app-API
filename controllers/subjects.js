const Subject = require("../models/subjects")
const Category = require("../models/category")

module.exports = {

  // POST categories/:category/sujects
  create: async (req, res) => {
    const { category } = req.params
    const { name } = req.body

    const subject = await Subject.create({ name, category })
    await subject.save()

    const categoryByCategoryName = await Category.findOne(
      { category_name: category }
    )

    try {
      categoryByCategoryName.subjects.push(subject)
      await categoryByCategoryName.save()
    } catch (err) {
      console.log(err);
    }
    return res.json(categoryByCategoryName)
  },

  // GET /categories/:category/subjects   by category id in req.params object
  subjectsByCategory: async (req, res) => {
    const { category } = req.params
    const getCategory = await Category.findOne({ category_name: category })
    return res.json(getCategory.subjects)
  },

  // GET /categories/:category/subjects/:id
  subjectByCategory: async (req, res) => {
    const { category, id } = req.params
    const getCategory = await Category.findOne({ category_name: category })
    const categoryBySubjects = await Subject.findOne({ name: id, category })
    return res.json(categoryBySubjects)
  },


  // GET /subjects/:id
  findSubject: async (req, res) => {
    const { id } = req.params
    const subject = await Subject.findOne({ name: id })
    return res.json(subject)
  },

  // GET /subjects
  findAll: async (req, res) => {
    const subjects = await Subject.find()
    return res.json(subjects)
  },

  // GET /subjects?sname=:name
  findAllByQuery: async (req, res) => {
    const { sname } = req.query
    console.log(sname);
    const subjects = await Subject.find({ name: sname })
    return res.json(subjects)
  },

  // Update subject in a category.... [change the name or remove a tutor]

  // PUT categories/:category/subjects/:id    // change the name
  updateSubject: async (req, res) => {
    const { category, id } = req.params
    const updatedBody = req.body
    const getCategory = await Category.findOne({ category_name: category })
    updatedBody.name ? name = updatedBody.name : name = id
    updatedBody.category ? category = updatedBody.category : category = category
    const updateSubjectName = await Subject.findOneAndUpdate({ name: id }, { name:name, category:category })
    await updateSubjectName.save()
    // const categoryBySubjects = await Subject.findOne({ name: id, category })
    return res.json(updateSubjectName)
  },

  // DELETE /categories/:category/sujects/:subject/tutors/:id    // delete the tutor
  // deleteTutorBySubject:

}
