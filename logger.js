const winston = require('winston')

const LOGGER_DIRNAME = 'logs'

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'http',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', dirname: LOGGER_DIRNAME, level: 'error' }),
    new winston.transports.File({ filename: 'combined.log', dirname: LOGGER_DIRNAME })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log', dirname: LOGGER_DIRNAME })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'rejections.log', dirname: LOGGER_DIRNAME })
  ]
})

const developmentFormatter = winston.format.printf(info => {
  const date = new Date(info.timestamp)
  const dateFormat = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  if (info.stack) return `[${dateFormat}] ${info.level}: ${info.stack}`
  return `[${dateFormat}] ${info.level}: ${info.message}`
})

if (process.env.NODE_ENV !== 'production') {
  const handler = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      developmentFormatter
    )
  })

  logger.add(handler)
  logger.exceptions.handle(handler)
  logger.rejections.handle(handler)
}

module.exports = logger
