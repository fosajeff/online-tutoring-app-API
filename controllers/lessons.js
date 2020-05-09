const Lesson = require("../models/lessons")
const Category = require("../models/category")
const Subject = require("../models/subjects")


module.exports = {

  // POST /lessons
  createLesson: async (req, res) => {
    const { title, subject, category, content } = req.body
    if (!title || !subject || !category || !content) {
      res.status(400).send({
        message: "All fields are required",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
      })
    }
    try {
      let exist = await Subject.findOne({ name: subject }) && await Category.findOne({ category_name: category}) && await Lesson.findOne({ title })
      if (exist) {
        return res.status(423)
        .send({
          message: `Lesson with name ${title} already exist`,
        })
      }
      const new_lesson = await Lesson.create({ title, subject, category, content })
      await new_lesson.save()
      return res.json(new_lesson)
    } catch (e) {
      console.log(e)
    }
  },


  // PATCH /lessons/:id     // title
  updateLesson: async (req, res) => {
    let { id } = req.params
    let updatedBody = req.body
    updatedBody.title ? title = updatedBody.title : title = id
    updatedBody.content ? content = updatedBody.content : content = content

    try {
      const getLesson = await Lesson.findOne({ title: id })
      if (getLesson === null) {
        return res.status(404)
        .send({
          message: `Lesson with name ${updatedBody.title} does not exist`,
        })
      }
      const updateLesson = await Lesson.findOneAndUpdate({ title: id }, { title:title, content:content })
      await updateLesson.save()
      return res.json({message: "Update Successful"})
    } catch(e) { console.log(e) }

  },

  // DELETE /lessons/:id
  deleteLesson: async (req, res) => {
    let { id } = req.params

    try {
      const getLesson = await Lesson.findOne({ title: id })
      if (getLesson === null) {
        return res.status(404)
        .send({
          message: `Lesson with name ${id} does not exist`,
        })
      }
      await Lesson.deleteOne({ title: id })
      return res.json({message: "Delete Successful"})
    } catch(e) { console.log(e) }

  },


    // GET /lessons
    findLesson: async (req, res) => {
      try {
        const lessons = await Lesson.find()
        res.json(lessons)
      } catch (e) {
        console.log(e)
      }
    },


  // GET /lessons/:id
  findOneLesson: async (req, res) => {
    try {
      const lesson = await Lesson.find({title:req.params.id})
      res.json(lesson)
    } catch(e) {
      console.log(e)
    }
  },

  // student book lesson
  bookLesson: async (req, res) => {
    const { full_name, subject, tutor, category, challenges, time_of_day } = req.body
    if (!full_name || !subject || !tutor || !category || !time_of_day) {
      res.status(400).send({
        message: "All fields are required",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
      })
    }
    return res.status(200).json({
      message: "Your lesson has been booked, we will contact your tutor."
    })

  }

}
