const express = require("express")
const app = express()
const studentRoutes = require("./routes/students/auth")
const { DB_URL, HOST } = require("./config")
const mongoose = require("mongoose")
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(studentRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
  console.log("Database connected successfully")
  app.listen(PORT, () => console.log(`Server running on http://${HOST}:${PORT}`))
}).catch(err => console.log(err))

// Index Page
app.get("/", (req, res) => {
  res.send({
    message: "Welcome",
    documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
  })
})

app.all("*", (req, res) => {
  res.status(404)
  .send({
    message: "Not Found",
    documentation_url: "https://somewebapp.com/api/v1/README.md"
  })
})
