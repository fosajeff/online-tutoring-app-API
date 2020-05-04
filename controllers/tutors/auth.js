const express = require("express")
const router = express.Router()
const Tutor = require("../../models/tutors")
const { SECRET_KEY } = require("../../config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.signUp = (req, res, next) => {
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email
  const password = req.body.password

  if (!first_name || !last_name || !email || !password) {
    res.status(400).send({
      message: "All fields are required",
      documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
    })
  }
  Tutor.findOne({ email })
  .then(tutor => {
    if (tutor) {
      return res.status(423).send({
        message: `A user with ${tutor.email} already exist`,
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    bcrypt.hash(password, 12)
    .then(password => {
      const tutor = new Tutor({ first_name, last_name, email, password })
      return tutor.save()
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

  Tutor.findOne({ email })
  .then(tutor => {
    if (!tutor) {
      return res.status(404).send({
        message: "Incorrect username or password, review details and try again",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    bcrypt.compare(password, tutor.password)
    .then(valid => {
      if(!valid) {
        res.status(403)
        .send({status: false, message: "Incorrect username or password, review details and try again"})
      }
      const token = jwt.sign({
        email: tutor.email,
        _id: tutor._id,
      }, SECRET_KEY, {expiresIn: 3600000})
      res.status(200).send({
        message: "Login successful",
        _id: tutor._id,
        token: token
      })
    }).catch(err => console.log(err))
    return
    next()
  })
}
