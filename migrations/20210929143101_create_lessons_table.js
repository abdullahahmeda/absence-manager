
exports.up = function (knex) {
  return knex.schema.createTable('lessons', function (table) {
    table.increments()
    table.string('name').notNullable().index()
    table.date('lesson_date').notNullable().index()
    table.integer('instructor_id').unsigned().notNullable().references('instructors.id').onDelete('cascade').index()
    table.timestamps(false, true)

    table.unique(['name', 'lesson_date', 'instructor_id'])
    table.charset('utf8')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('lessons')
}
