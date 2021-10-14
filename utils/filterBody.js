const xss = require('xss')

function filterBody (body) {
  const filtered = {}
  for (const key in body) {
    if (typeof body[key] === 'object') filtered[key] = body[key]
    else filtered[key] = xss(body[key])
  }
  return filtered
}

module.exports = filterBody
