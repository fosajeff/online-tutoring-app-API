const Tutor = require("../models/tutors");
const Category = require("../models/category");
const Subject = require("../models/subjects");
const jwtDecode = require("jwt-decode");

// GET /tutors?fname=:id

// the full_name initiative
// const tutor_parts = tutor.split(" ");
// let first_name = tutor_parts[0];
// let last_name = tutor_parts[1];

module.exports = {
  findTutorsByFirstName: async (req, res) => {
    const { fname } = req.query;
    const tutors = await Tutor.find(
      { first_name: fname },
      { __v: 0, email: 0, password: 0, role: 0, createdAt: 0, updatedAt: 0 }
    ).sort({ first_name: 1, last_name: 1 });
    if (tutors.length < 1) {
      res.send({ message: `No tutors with name ${fname}` });
    }
    return res.json(tutors);
  },

  // GET /categories/:category/tutors
  tutorsByCategory: async (req, res) => {
    const { category } = req.params;
    const cat = await Category.find({ category_name: category }, { __v: 0 });

    return res.json(cat.tutors);
  },

  // PUT /categories/:category/subjects/:subject/register
  registerSubject: async (req, res) => {
    const { category, subject } = req.params;

    let checkSubject = await Subject.findOne({ name: subject, category });
    let checkCategory = await Category.findOne({ category_name: category });

    // get user id from token
    const token = req.header("Authorization").split(" ")[1];
    const user_token = jwtDecode(token);
    const user_id = user_token._id;
    const data = await Tutor.findById(user_id, {
      _v: 0,
      email: 0,
      password: 0,
      role: 0,
      createdAt: 0,
      updatedAt: 0
    });
    const tutor_name = `${data.first_name} ${data.last_name}`;
    const subject_with_category = subject + " (" + category + ")";

    if (!(checkCategory === null) && checkCategory.category_name) {
      if (!(checkSubject === null) && checkSubject.name) {
        try {
          // check if the current subject and the category is already registered
          if (data.subjects.includes(subject_with_category)) {
            return res.status(423).send({
              message: `You already registered ${subject} in ${category} category`
            });
          }

          // add tutor to category
          if (!data.category.includes(category)) {
            data.category.push(category);
            await data.save();
          }
          if (!checkCategory.tutors.includes(tutor_name)) {
            checkCategory.tutors.push(tutor_name);
            await checkCategory.save();
          }
          // add category in brackets to differentiate various subjects
          data.subjects.push(subject_with_category);
          await data.save();
          return res.status(200).json({
            message: "Registration successfull",
            data
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        return res.status(423).send({
          message: "Subject does not exist"
        });
      }
    } else {
      res.status(423).send({
        message: "Category does not exist"
      });
    }
  },

  // PUT /categories/:category/subjects/:subject/unregister
  unregisterSubject: async (req, res) => {
    const { category, subject } = req.params;

    let checkSubject = await Subject.findOne({ name: subject, category });
    let checkCategory = await Category.findOne({ category_name: category });

    // get user id from token
    const token = req.header("Authorization").split(" ")[1];
    const user_token = jwtDecode(token);
    const user_id = user_token._id;
    const data = await Tutor.findById(user_id, {
      _v: 0,
      email: 0,
      password: 0,
      role: 0,
      createdAt: 0,
      updatedAt: 0
    });
    const tutor_name = `${data.first_name} ${data.last_name}`;

    if (!(checkCategory === null) && checkCategory.category_name) {
      if (!(checkSubject === null) && checkSubject.name) {
        try {
          // recover the specific subject in category
          const subject_name = subject + " (" + category + ")";

          if (data.subjects.includes(subject_name)) {
            // remove subject from tutor registered subjects
            let i = data.subjects.indexOf(subject_name);
            data.subjects.splice(i, 1);
            data.save();

            // remove category that the tutor belongs to
            // check if he still has a registered subject thath belongs to the category
            const count = data.subjects.filter(sub => {
              const subject_category = sub.split(" ")[1].slice(1, -1);
              return subject_category === category;
            }).length;

            if (count < 1) {
              // remove category from tutor categories
              let ind = data.category.indexOf(category);
              data.category.splice(ind, 1);

              // remove tutor from the list of tutors in the main category
              let inde = checkCategory.tutors.indexOf(tutor_name);
              checkCategory.tutors.splice(inde, 1);
              checkCategory.save();
            }
            return res.status(200).json({
              message: "1 subject unregistered",
              data
            });
          } else {
            res.status(404).json({
              message: "Error deleting. Subject not registered"
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        return res.status(423).send({
          message: "Subject does not exist"
        });
      }
    } else {
      res.status(423).send({
        message: "Category does not exist"
      });
    }
  }
};
