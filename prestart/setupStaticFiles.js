const express = require('express')
const { paths } = require('../constants')

function setupStaticFiles (app) {
  app.use(express.static(paths.staticFiles))
}

module.exports = setupStaticFiles
