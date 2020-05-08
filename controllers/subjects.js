const Subject = require("../models/subjects")
const Category = require("../models/category")

module.exports = {

  // POST categories/:category/sujects
  create: async (req, res) => {
    const { category } = req.params
    const { name } = req.body

    if (!name) {
      res.status(400).send({
        message: "Invalid field name",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }

    let exist = await Subject.findOne({ name }) && await Category.findOne({ category_name: category})
    if (!exist) {
      try {
        const subject = await Subject.create({ name, category })
        await subject.save()

        const categoryByCategoryName = await Category.findOne(
          { category_name: category }
        ).populate("subjects")
        categoryByCategoryName.subjects.push(subject)
        await categoryByCategoryName.save()
        return res.json(categoryByCategoryName)

      } catch (err) {console.log(err)}

    }
    res.status(423)
    .send({
      message: `Subject or with name ${name} already exist or Category with name ${category} does not exist`,
    })
  },

  // GET /categories/:category/subjects   by category id in req.params object
  subjectsByCategory: async (req, res) => {
    const { category } = req.params
    const getCategory = await Category.findOne({ category_name: category }).populate("subjects")
    if (!getCategory) {
      res.status(404)
      .send({
        message: `Category with name ${category} does not exist`,
      })
    }
    const subjects = getCategory.subjects
    if (!subjects) {
      res.status(404)
      .send({
        message: `No subject exist in the ${category} category`,
      })
    }
    return res.json(subjects)
  },

  // GET /categories/:category/subjects/:id
  subjectByCategory: async (req, res) => {
    const { category, id } = req.params
    const getCategory = await Category.findOne({ category_name: category })
    if (!getCategory) {
      res.status(404)
      .send({
        message: `Category with name ${category} does not exist`,
      })
    }
    const categoryBySubjects = await Subject.findOne({ name: id, category })
    if (!categoryBySubjects) {
      res.status(404)
      .send({
        message: `No subject with name ${id} exist in the ${category} category`,
      })
    }
    return res.json(categoryBySubjects)
  },


  // GET /subjects?sname=:name
  findAllByQuery: async (req, res) => {
    const { sname } = req.query
    if (!sname) {
      res.status(400).send({
        message: "Invalid query parameter",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    try {
      const subjects = await Subject.find({ name: sname })
      if (!subjects[0]) {
        return res.status(404)
        .send({
          message: `No subject with name ${sname} exist in any category`,
        })
      }
      return res.json(subjects)
    } catch (e) { console.log(e) }
  },

  // Update subject in a category.... [change the name or remove a tutor]

  // PUT categories/:category/subjects/:id    // change the name
  updateSubject: async (req, res) => {
    let { category, id } = req.params
    let updatedBody = req.body
    updatedBody.name ? name = updatedBody.name : name = id
    updatedBody.category ? category = updatedBody.category : category = category

    try {
      const getCategory = await Category.findOne({ category_name: category })
      if (getCategory === null) {
        return res.status(404)
        .send({
          message: `Category with name ${updatedBody.category} does not exist`,
        })
      }
    } catch(e) { console.log(e) }

    try {
      const updateSubjectName = await Subject.findOneAndUpdate({ name: id }, { name:name, category:category })
      if (updateSubjectName === null) {
        return res.status(404)
        .send({
          message: `Subject with name ${id} does not exist`,
        })
      }
      await updateSubjectName.save()
      return res.json({message: "Update Successful"})
    } catch (e) { console.log(e) }
},

  // DELETE /categories/:category/sujects/:subject/tutors/:id    // delete the tutor
  // deleteTutorBySubject:


  // DELETE /categories/:category/subjects/:id
  // deleteSubjectByCategory: async (req, res) => {
  //   const { category, id } = req.params
  //   const getCategory = await Category.findOne({ category_name: category })
  //   if (getCategory === null) {
  //     res.status(404)
  //     .send({
  //       message: `Category with name ${category} does not exist`,
  //     })
  //   }
  //   // getCategory.remove(function () {
  //   //   return res.json({message: "Subject deleted"})
  //   // })
  //   const categoryBySubjects = await Subject.findOne({ name: id, category })
  //   if (!categoryBySubjects) {
  //     res.status(404)
  //     .send({
  //       message: `No subject with name ${id} exist in the ${category} category`,
  //     })
  //   }
  //   try {
  //     const deleted = await categoryBySubjects.deleteOne({ name: id, category: category })
  //     res.json({message: "Deleted Successfully", categoryBySubjects})
  //   } catch (e) { console.log(e) }
  // }

  // DELETE /categories/:category/subjects/:id
  deleteSubjectByCategory: async (req, res) => {
    const subject = Subject.findOne({ name: req.params.name })
    if (!subject) {
      return res.status(404).json({message: `Subject with name ${req.params.name} not found`})
    }
    try {
      subject.remove(function(err) {
        if (!err) {
          Category.update({_id: subject.category}, {$pull: {subject: subject._id}}, function (err, numberAffected) {
            return res.json({message: `${numberAffected.ok} subject deleted`})
          })
        } else {
          console.log(err);
        }
      })
    } catch(e) { console.log(e) }
  }

}
