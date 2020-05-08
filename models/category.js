const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Subject = require("./subjects")

const categorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject"
    }
  ],
  tutors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tutor"
    }
  ]
})

categorySchema.pre('remove', function (cb) {
  this.model('Subject').remove({ Category_id: this._id }, cb)
})

module.exports = mongoose.model("Category", categorySchema)
