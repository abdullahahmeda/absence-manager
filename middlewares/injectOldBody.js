const _ = require('lodash')

module.exports = function (req, res, next) {
  if (!_.isEmpty(req.body)) req.flash('old', req.body)
  next()
}
