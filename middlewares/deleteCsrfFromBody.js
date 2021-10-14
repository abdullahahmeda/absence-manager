/**
 * Deletes _csrf from `req.body`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = function (req, res, next) {
  if (req.body._csrf) delete req.body._csrf
  next()
}
