const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Category = require("./category")

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
})

subjectSchema.pre('remove', function(next){
    this.model('Category').update(

    );
});
module.exports = mongoose.model("Subject", subjectSchema)
