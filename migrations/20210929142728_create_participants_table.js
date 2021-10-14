
exports.up = function (knex) {
  return knex.schema.createTable('participants', function (table) {
    table.increments()
    table.string('name').notNullable().unique().index()
    table.timestamps(false, true)
    table.charset('utf8')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('participants')
}
