const express = require("express")
const router = express.Router()
const Student = require("../../models/students")
const bcrypt = require("bcryptjs")

exports.signUp = (req, res, next) => {
  const fullName = req.body.fullName
  const email = req.body.email
  const password = req.body.password

  if (!fullName || !email || !password) {
    res.status(400).send({
      message: "All fields are required",
      documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
    })
  }
  Student.findOne({ email })
  .then(student => {
    if (student) {
      return res.status(423).send({
        message: `A user with ${student.email} already exist`,
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    bcrypt.hash(password, 12)
    .then(password => {
      const student = new Student({ fullName, email, password })
      return student.save()
    }).then(() => {
      return res.status(201).send({
        message: "Account created successfully"
      })
    }).catch(err => console.log(err))
    res.send({
      message: "Proceed to login with",
      email
    })
    return
    next()
  })
}
