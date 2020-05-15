const Subject = require("../models/subjects");
const Category = require("../models/category");

module.exports = {
  // POST categories/:category/sujects
  create: async (req, res) => {
    const { category } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).send({
        message: "Invalid field name",
        documentation_url:
          "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
      });
    }

    let checkSubject = await Subject.findOne({ name, category });
    let checkCategory = await Category.findOne({ category_name: category });

    if (!(checkCategory === null) && checkCategory.category_name) {
      if (checkSubject === null || !checkSubject.name) {
        try {
          const subject = await Subject.create({ name, category });
          await subject.save();

          const categoryByCategoryName = await Category.findOne({
            category_name: category
          }).populate("subjects");
          categoryByCategoryName.subjects.push(subject);
          await categoryByCategoryName.save();
          return res.json(categoryByCategoryName);
        } catch (err) {
          console.log(err);
        }
      } else {
        return res.status(423).send({
          message: "Subject already exist"
        });
      }
    } else {
      res.status(423).send({
        message: "Category does not exist"
      });
    }
  },

  // GET /categories/:category/subjects   by category id in req.params object
  subjectsByCategory: async (req, res) => {
    const { category } = req.params;
    const getCategory = await Category.findOne(
      { category_name: category },
      { _id: 0, __v: 0 }
    ).populate("subjects");
    if (!getCategory) {
      return res.status(404).send({
        message: `Category with name ${category} does not exist`
      });
    }
    const subjects = getCategory.subjects;
    if (!subjects.length > 0) {
      return res.status(404).send({
        message: `No subject exist in the ${category} category`
      });
    }
    return res.json(subjects);
  },

  // GET /categories/:category/subjects/:id
  subjectByCategory: async (req, res) => {
    const { category, id } = req.params;
    const getCategory = await Category.findOne({ category_name: category });
    if (!getCategory) {
      res.status(404).send({
        message: `Category with name ${category} does not exist`
      });
    }
    const categoryBySubjects = await Subject.findOne(
      { name: id, category },
      { __v: 0 }
    );
    if (!categoryBySubjects) {
      res.status(404).send({
        message: `No subject with name ${id} exist in the ${category} category`
      });
    }
    return res.json(categoryBySubjects);
  },

  // GET /subjects?sname=:name
  findAllByQuery: async (req, res) => {
    const { sname } = req.query;
    if (!sname) {
      res.status(400).send({
        message: "Invalid query parameter",
        documentation_url:
          "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
      });
    }
    try {
      const subjects = await Subject.find({ name: sname }, { __v: 0 });
      if (!subjects[0]) {
        return res.status(404).send({
          message: `No subject with name ${sname} exist in any category`
        });
      }
      return res.json(subjects);
    } catch (e) {
      console.log(e);
    }
  },

  // Update subject in a category.... [change the name or remove a tutor]

  // PUT categories/:category/subjects/:id    // change the name
  updateSubject: async (req, res) => {
    const { category, id } = req.params;
    const updatedBody = req.body;
    updatedBody.name ? (name = updatedBody.name) : (name = id);
    updatedBody.category ? (category = updatedBody.category) : category;

    try {
      const getCategory = await Category.findOne({ category_name: category });
      if (getCategory === null || !getCategory.category_name) {
        return res.status(404).send({
          message: `Category with name (${updatedBody.category}) does not exist`
        });
      } else {
        const checkSubject = await Subject.findOne({ name: id });
        if (checkSubject === null || !checkSubject.name) {
          return res.status(404).send({
            message: `Subject with name (${id}) does not exist`
          });
        } else {
          // let's update
          const newSubjectUpdate = await Subject.updateOne(
            { name: id },
            { name: name, category: category }
          );
          return res.json({
            message: `${newSubjectUpdate.nModified} subject updated successfully`
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  },

  // DELETE /categories/:category/subjects/:id
  deleteSubjectByCategory: async (req, res) => {
    const { id } = req.params;
    const subject = Subject.findOne({ name: req.params.id });
    if (!subject) {
      return res
        .status(404)
        .json({ message: `Subject with name (${req.params.id}) not found` });
    }
    try {
      subject.remove(function(err) {
        if (!err) {
          Category.update(
            { _id: subject.category },
            { $pull: { subject: subject._id } },
            function(err, numberAffected) {
              return res.json({
                message: `${numberAffected.ok} subject deleted`
              });
            }
          );
        } else {
          console.error(err);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
};
