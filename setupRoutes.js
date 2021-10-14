const routes = require('./routes')

function setupRoutes (app) {
  for (const routesGroup of routes) {
    app.use(routesGroup.prefix, routesGroup.routes)
  }
}

module.exports = setupRoutes
