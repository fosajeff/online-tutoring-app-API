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
  subjects: {
    type: Array
  },
  category: {
    type: Array
  },
  role: String
}, { timestamps: true })


module.exports = mongoose.model("Tutor", tutorSchema)
