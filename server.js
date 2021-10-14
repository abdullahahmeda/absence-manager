const app = require('./app')
const logger = require('./logger')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => logger.info('App has started at ' + PORT))
