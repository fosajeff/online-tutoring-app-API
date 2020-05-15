require("dotenv-extended").config();

module.exports = {
	DB_URL: process.env.DB_URL,
	SECRET_KEY: process.env.SECRET_KEY
}
