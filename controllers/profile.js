const Validator = require('../validator')
const User = require('../models/User')
const filterBody = require('../utils/filterBody')
const { hashString, compareString } = require('../utils/hash')

async function edit (req, res) {
  const user = await User.query().findById(req.session.user)
  res.render('dashboard/edit-profile.html', {
    user
  })
}

async function update (req, res) {
  const filteredBody = filterBody(req.body)
  const validation = new Validator(filteredBody, attributesRules)
  if (validation.fails()) {
    return res.redirect('/dashboard/edit-profile')
  }
  const hashedPassword = (await User.query().findById(req.session.user)).password
  const isPasswordCorrect = await compareString(filteredBody.current_password, hashedPassword)
  if (!isPasswordCorrect) {
    return res.redirect('/dashboard/edit-profile')
  }
  const password = await hashString(filteredBody.new_password ? filteredBody.new_password : filteredBody.current_password)
  await User.query().findById(req.session.user).update({
    username: filteredBody.username,
    password
  })
  return res.redirect('/dashboard')
}

const attributesRules = {
  username: 'required|string|min:3|max:30',
  current_password: 'required|string|min:4|max:30',
  new_password: 'string|min:4|max:30',
  new_password_confirmation: 'required_with:new_password|same:new_password'
}

module.exports = {
  edit,
  update
}
