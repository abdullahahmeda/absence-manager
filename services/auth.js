const User = require('../models/User')
const { compareString } = require('../utils/hash')

async function login (data) {
  const user = await User.query().where('username', data.username).first()
  if (!user) return ['LOGIN_INCORRECT_DATA', null]
  const isCorrectPassword = await compareString(data.password, user.password)
  if (!isCorrectPassword) return ['LOGIN_INCORRECT_DATA', null]
  return [null, user]
}

module.exports = {
  login
}
