const mongoose = require("mongoose")
const Schema = mongoose.Schema

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  content: {
    type: String
  }
})


module.exports = mongoose.model("Lesson", lessonSchema)
