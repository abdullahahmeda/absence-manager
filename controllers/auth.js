const Validator = require('../validator')
const URL = require('url').URL
const auth = require('../services/auth')
const filterBody = require('../utils/filterBody')

function login (req, res) {
  res.render('login.html')
}

async function loginPost (req, res) {
  const filteredBody = filterBody(req.body)
  const validation = new Validator(filteredBody, loginValidationRules)
  if (validation.fails()) {
    req.flash('errors', validation.errors.all())
    return res.redirect('back')
  }

  const [error, user] = await auth.login(filteredBody)
  if (error) {
    req.flash('alert', {
      type: 'danger',
      message: 'إسم المستخدم أو كلمة المرور خاطئة.'
    })
    return res.redirect('back')
  }
  req.session.user = user.id

  let redirect
  if (req.headers.referer) redirect = new URL(req.headers.referer).searchParams.get('r')
  req.session.save(err => {
    if (err) res.redirect('back')
    else {
      console.log(redirect)
      if (redirect) return res.redirect(decodeURIComponent(redirect))
      res.redirect('/dashboard')
    }
  })
}

function logout (req, res) {
  req.session.user = null
  req.session.save(err => {
    if (err) res.redirect('/dashboard')
    else res.redirect('/login')
  })
}

const attributesRules = {
  username: 'required|string|min:3|max:30',
  password: 'required|string|min:4|max:30'
}

const loginValidationRules = {
  username: attributesRules.username,
  password: attributesRules.password
}

module.exports = {
  login,
  loginPost,
  logout
}
