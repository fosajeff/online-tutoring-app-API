const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const Tutor = require("../models/tutors")
const User = require("../models/users")


module.exports = {

  authenticate: async (req, res, next) => {
    try {
      const token = req.header("Authorization").split(' ')[1]
      const data = jwt.verify(token, SECRET_KEY)
      const user = await User.findOne({ _id: data._id })
        if (!user) {
            const tutor = await Tutor.findOne({ _id: data._id })
            if (!tutor) {
              throw new Error()
            }
            req.user = tutor
            return next()
        }
        req.user = user
        next()
    } catch (error) {
      return res.status(401).send({
        message: "Unauthorized access, provide a valid token",
        documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
      })
    }
  },

  // check role
  authenticateByRole: (allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return next(res.status(401).send({
          message: "You are not authorized to access this resource",
          documentation_url: "https://github.com/fosajeff/online-tutoring-app-API/README.md"
        }));
      }
      return next()
    };
  }
}
