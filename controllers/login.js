const express = require("express")
const Student = require("../models/students")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


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
      }, "somesecretkey", {expiresIn: 3600000})
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
