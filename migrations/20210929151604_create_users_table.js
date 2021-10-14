
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.string('username').notNullable().index()
    table.string('password').notNullable()
    table.timestamps(false, true)
    table.charset('utf8')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
