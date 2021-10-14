/**
 * Only continue if a user is authenticated, else redirect to homepage.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = function (req, res, next) {
  if (req.session.user) next()
  else res.redirect(`/login?r=${encodeURIComponent(req.originalUrl)}`)
}
