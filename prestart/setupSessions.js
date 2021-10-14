const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const db = require('../db')
const ms = require('ms')
const { sessionKey } = require('../config')

function setupSessions (app) {
  const options = {
    store: new KnexSessionStore({
      knex: db
    }),
    cookie: {
      maxAge: ms('2h')
    },
    saveUninitialized: false,
    secret: sessionKey,
    resave: false
  }

  if (process.env.NODE_ENV === 'production') {
    options.cookie.secure = true
  }

  app.use(session(options))
}

module.exports = setupSessions
