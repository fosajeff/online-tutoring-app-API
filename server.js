const express = require("express")
const app = express()
const authRoutes = require("./routes/auth")
const tutorRoutes = require("./routes/tutors")
const categoryRoutes = require("./routes/category")
const subjectRoutes = require("./routes/subjects")
const lessonRoutes = require("./routes/lessons")
const { DB_URL, HOST } = require("./config")
const mongoose = require("mongoose")
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(authRoutes)
app.use(tutorRoutes)
app.use(categoryRoutes)
app.use(subjectRoutes)
app.use(lessonRoutes)


const PORT = process.env.PORT || 5000;
const url = DB_URL || "mongodb://localhost:27017/newTest"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
  console.log("Database connected successfully")
  app.listen(PORT, () => console.log(`Server running on http://${HOST}:${PORT}`))
}).catch(err => console.log("Connection to database failed =>", err))

// Index Page
app.get("/", (req, res) => {
  res.send({
    message: "Welcome",
    documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
  })
})

app.all("*", (req, res) => {
  res.status(404)
  .send({
    message: "404 - Not Found",
    documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/blob/master/README.md"
  })
})
