// Update with your config settings.

const config = require('./config')

module.exports = {

  development: {
    client: config.database.client,
    connection: config.database.connection
  },

  staging: {
    client: config.database.client,
    connection: config.database.connection,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: config.database.client,
    connection: config.database.connection,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
