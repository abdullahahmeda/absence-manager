module.exports = function (req, res, next) {
  res.locals._csrf = `<input type="hidden" name="_csrf" value="${req.csrfToken()}">`
  res.locals._csrfToken = req.csrfToken()

  // res.locals._errors = req.flash('errors')
  // res.locals._old = req.flash('old')
  // const flashMessages = req.flash()
  // res.locals.flash = flashMessages

  res.locals.user = req.session.user

  next()
}
