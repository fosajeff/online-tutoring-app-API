const Lesson = require("../models/lessons");
const Category = require("../models/category");
const Subject = require("../models/subjects");

module.exports = {
  // POST /lessons
  createLesson: async (req, res) => {
    const { title, subject, category, content } = req.body;
    if (!title || !subject || !category || !content) {
      res.status(400).send({
        message: "All fields are required",
        documentation_url:
          "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
      });
    }

    const checkSubject = await Subject.findOne({ name: subject, category });
    const checkCategory = await Category.findOne({ category_name: category });
    const checkLesson = await Lesson.findOne({ title });

    if (!(checkCategory === null) && checkCategory.category_name) {
      if (!(checkSubject === null) && checkSubject.name) {
        if (checkLesson === null || !checkLesson.title) {
          try {
            const new_lesson = await Lesson.create({
              title,
              subject,
              category,
              content
            });
            await new_lesson.save();
            return res.json(new_lesson);
          } catch (err) {
            console.log(err);
          }
        } else {
          return res.status(423).send({
            message: "Lesson with that name already exist"
          });
        }
      } else {
        res.status(423).send({
          message: `Subject does not exist in ${category} category`
        });
      }
    } else {
      res.status(423).send({
        message: "Category does not exist"
      });
    }
  },

  // PATCH /lessons/:id     // title
  updateLesson: async (req, res) => {
    let { id } = req.params;
    let updatedBody = req.body;
    updatedBody.title ? (title = updatedBody.title) : (title = id);
    updatedBody.content ? (content = updatedBody.content) : (content = content);

    try {
      const getLesson = await Lesson.findOne({ title: id });
      console.log();

      if (getLesson === null || !getLesson.id) {
        return res.status(404).send({
          message: `Lesson with name (${id}) does not exist`
        });
      }
      const updateLesson = await Lesson.updateOne(
        { title },
        { title, content }
      );

      return res.json({
        message: `${updateLesson.nModified} Updated Successfully`
      });
    } catch (e) {
      console.log(e);
    }
  },

  // DELETE /lessons/:id
  deleteLesson: async (req, res) => {
    let { id } = req.params;

    try {
      const getLesson = await Lesson.findOne({ title: id });
      if (getLesson === null || !getLesson.id) {
        return res.status(404).send({
          message: `Lesson with name ${id} does not exist`
        });
      }
      const deletedLesson = await Lesson.deleteOne({ title: id });
      return res.json({
        message: `${deletedLesson.deletedCount} Deleted Successfully`
      });
    } catch (e) {
      console.log(e);
    }
  },

  // GET /lessons
  findLesson: async (req, res) => {
    try {
      const lessons = await Lesson.find({}, { _id: 0, __v: 0 });
      res.json(lessons);
    } catch (e) {
      console.log(e);
    }
  },

  // GET /lessons/:id
  findOneLesson: async (req, res) => {
    const title = req.params.id
    
    try {
      const lesson = await Lesson.findOne(
        { title },
        { _id: 0, __v: 0 }
      );
      
      if (lesson === null || lesson.title !== title) {
        return res.status(404).send({
          message: `Lesson with name (${title}) does not exist`
        });
      }
      res.json(lesson);
    } catch (e) {
      console.error(e);
    }
  },

  // student book lesson
  bookLesson: async (req, res) => {
    const {
      full_name,
      subject,
      tutor,
      category,
      challenges,
      time_of_day
    } = req.body;
    if (!full_name || !subject || !tutor || !category || !time_of_day) {
      res.status(400).send({
        message: "All fields are required",
        documentation_url:
          "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
      });
    }
    return res.status(200).json({
      message: "Your lesson has been booked, we will contact your tutor."
    });
  }
};
