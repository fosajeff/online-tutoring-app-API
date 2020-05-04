const express = require("express")
const router = express.Router()
const Student = require("../../models/students")
const { DB_URL, HOST, SECRET_KEY } = require("../../config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signUp = (req, res, next) => {
  const full_name = req.body.full_name
  const email = req.body.email
  const password = req.body.password

  if (!full_name || !email || !password) {
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
      const student = new Student({ full_name, email, password })
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

exports.logIn = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  Student.findOne({ email })
  .then(student => {
    if (!student) {
      return res.status(404).send({
        message: "Incorrect username or password, review details and try again",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    bcrypt.compare(password, student.password)
    .then(valid => {
      if(!valid) {
        res.status(403)
        .send({status: false, message: "Incorrect username or password, review details and try again"})
      }
      const token = jwt.sign({
        email: student.email,
        _id: student._id,
      }, SECRET_KEY, {expiresIn: 3600000})
      res.status(200).send({
        message: "Login successful",
        _id: student._id,
        token: token
      })
    }).catch(err => console.log(err))
    return
    next()
  })
}
