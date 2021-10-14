module.exports = function flash (req, res, next) {
  req.flash = _flash
  next()
}

function _flash (type, value) {
  if (this.session === undefined) throw new Error('req.flash() requires sessions')
  const msgs = this.session.flash = this.session.flash || {}

  if (type && value) {
    msgs[type] = value
  } else if (type) {
    const msg = msgs[type]
    delete msgs[type]
    return msg || null
  } else {
    this.session.flash = {}
    return msgs
  }
}
