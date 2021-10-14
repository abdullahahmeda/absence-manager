const setupSessions = require('./setupSessions')
const setupViewEngine = require('./setupViewEngine')
const setupStaticFiles = require('./setupStaticFiles')
const setupCookieParser = require('./setupCookieParser')

module.exports = function preStartSetup (app) {
  setupStaticFiles(app)
  setupViewEngine(app)
  setupSessions(app)
  setupCookieParser(app)
}
