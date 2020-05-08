const express = require("express")
const router = express.Router()
const User = require("../models/users")
const Tutor = require("../models/tutors")
const { SECRET_KEY } = require("../config")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


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
  User.findOne({ email })
  .then(user => {
    if (user) {
      return res.status(423).send({
        message: `A user with ${user.email} already exist`,
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    bcrypt.hash(password, 12)
    .then(password => {
      const user = new User({ full_name, email, password })
      return user.save()
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

  User.findOne({ email })
  .then(user => {
    if (!user) {
      return res.status(404).send({
        message: "Incorrect username or password, review details and try again",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    bcrypt.compare(password, user.password)
    .then(valid => {
      if(!valid) {
        res.status(403)
        .send({status: false, message: "Incorrect username or password, review details and try again"})
      }
      const token = jwt.sign({
        _id: user._id,
      }, SECRET_KEY, {expiresIn: '1d'})
      res.status(200).send({
        message: "Login successful",
        _id: user._id,
        token: token
      })
      // req.user = token
    }).catch(err => console.log(err))
    return
    next()
  })
}

// tutor
exports.signUpTutor = (req, res, next) => {
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email
  const password = req.body.password
  const role = 'tutor'

  if (!first_name || !last_name || !email || !password) {
    res.status(400).send({
      message: "All fields are required",
      documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
    })
  }
  Tutor.findOne({ email })
  .then(user => {
    if (user) {
      return res.status(423).send({
        message: `A user with ${user.email} already exist`,
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    bcrypt.hash(password, 12)
    .then(password => {
      const user = new Tutor({ first_name, last_name, email, password, role })
      return user.save()
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


exports.logInTutor = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  Tutor.findOne({ email })
  .then(user => {
    if (!user) {
      return res.status(404).send({
        message: "Incorrect username or password, review details and try again",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
    bcrypt.compare(password, user.password)
    .then(valid => {
      if(!valid) {
        res.status(403)
        .send({message: "Incorrect username or password, review details and try again",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"})
      }
      const token = jwt.sign({
        _id: user._id,
      }, SECRET_KEY, {expiresIn: '1d'})
      res.status(200).send({
        message: "Login successful",
        _id: user._id,
        token: token,
        role: user.role
      })
      // req.user = token
    }).catch(err => console.log(err))
    return
    next()
  })
}
