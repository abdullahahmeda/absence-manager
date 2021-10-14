const config = require('./config')

const db = require('knex')({
  client: config.database.client,
  connection: config.database.connection
})

module.exports = db
