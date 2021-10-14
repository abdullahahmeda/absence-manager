const express = require('express')

const setupExpressApp = require('./setupExpressApp')

const app = express()

setupExpressApp(app)

module.exports = app
