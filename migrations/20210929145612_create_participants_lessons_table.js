
exports.up = function (knex) {
  return knex.schema.createTable('participants_lessons', function (table) {
    table.increments()
    table.integer('lesson_id').unsigned().notNullable().index().references('lessons.id')
    table.integer('participant_id').unsigned().notNullable().index().references('participants.id')
    table.timestamps(false, true)
    table.charset('utf8')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('participants_lessons')
}
