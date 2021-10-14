const logger = require('../logger')

module.exports = function (req, res, next) {
  res.on('finish', function () {
    logger.http(`${req.method} ${req.url} ${res.statusCode}`)
  })
  next()
}
