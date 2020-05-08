const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  },
  subjects: {
    type: Array
  },
  tutors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tutor"
    }
  ]
})


module.exports = mongoose.model("Category", categorySchema)
