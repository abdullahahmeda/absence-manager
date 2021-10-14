const path = require('path')

const views = path.resolve(__dirname, 'views')
const staticFiles = path.resolve(__dirname, 'public')
const schemasDir = path.resolve(__dirname, 'db', 'schemas')
const seedersDir = path.resolve(__dirname, 'db', 'seeders')

exports.paths = {
  views,
  staticFiles,
  schemasDir,
  seedersDir
}
