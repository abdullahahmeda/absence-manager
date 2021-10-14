const cookieParser = require('cookie-parser')
const { sessionKey } = require('../config')

function setupCookieParser (app) {
  app.use(cookieParser(sessionKey))
}

module.exports = setupCookieParser
