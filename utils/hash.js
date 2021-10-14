const bcrypt = require('bcryptjs')
const promisify = require('util').promisify

const genSalt = promisify(bcrypt.genSalt)
const hash = promisify(bcrypt.hash)
const compare = promisify(bcrypt.compare)

/**
 * Hashes a string.
 * @param {*} string
 * @returns {string}
 */
async function hashString (string) {
  return genSalt(10)
    .then(salt => hash(string, salt))
}

/**
 * Compares a string with a hash and returns `true` if `hash` belongs to `string`, `false` otherwise.
 * @param {string} string
 * @param {string} hash
 * @returns {bool}
 */
async function compareString (string, hash) {
  return compare(string, hash).then(result => result === true)
}

exports.hashString = hashString
exports.compareString = compareString
