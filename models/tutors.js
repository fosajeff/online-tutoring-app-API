const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tutorSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registered_subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    }
  ],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ]
}, { timestamps: true })


module.exports = mongoose.model("Tutor", tutorSchema)
