const nunjucks = require('nunjucks')
const { paths } = require('../constants')

function setupViewEngine (app) {
  const env = nunjucks.configure(paths.views, {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV !== 'production'
  })
  env.addFilter('date', function (str) {
    const date = new Date(str)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  })
}

module.exports = setupViewEngine
