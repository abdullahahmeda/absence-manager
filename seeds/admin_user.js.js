const { hashString } = require('../utils/hash')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
      return knex('users').insert({
        id: 1,
        username: 'admin',
        password: await hashString('1234')
      })
    })
}
