const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  full_name: {
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
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tutor"
    }
  ],
  role: String
}, { timestamps: true })


module.exports = mongoose.model("User", userSchema)
