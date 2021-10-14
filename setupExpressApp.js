const express = require('express')
const flash = require('./middlewares/flash')
const csrfProtection = require('./middlewares/csrfProtection')
const deleteCsrfFromBody = require('./middlewares/deleteCsrfFromBody')
const expose = require('./middlewares/expose')
const injectCsrfToRequest = require('./middlewares/injectCsrfToRequest')
const logger = require('./middlewares/logger')
const preStartSetup = require('./prestart')
const setupRoutes = require('./setupRoutes')
const injectOldBody = require('./middlewares/injectOldBody')
const { Model } = require('objection')
const db = require('./db')
const helmet = require('helmet')

function setupExpressApp (app) {
  preStartSetup(app)

  app.use(helmet({
    contentSecurityPolicy: false
  }))
  app.use(logger)
  app.use(express.urlencoded({ extended: false }))
  app.use(csrfProtection)
  app.use(flash)
  app.use(expose)
  app.use(injectCsrfToRequest)
  app.use(deleteCsrfFromBody)
  app.use(injectOldBody)

  setupRoutes(app)
}

function setupModels () {
  Model.knex(db)
}
setupModels()

module.exports = setupExpressApp
