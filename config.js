(require('dotenv').config({ silent: process.env.NODE_ENV === 'production' }))

module.exports = {
	DB_URL: process.env.DB_URL,
	SECRET_KEY: process.env.SECRET_KEY
}
