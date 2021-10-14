/**
 * Injects `req._csrfToken` which is `req.body._csrf`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = function (req, res, next) {
  if (req.body._csrf) req._csrfToken = req.body._csrf
  next()
}
