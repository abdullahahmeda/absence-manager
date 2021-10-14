const Validator = require('validatorjs')
const arErrorsMessages = require('./locales/errors/ar')
Validator.setMessages('ar', arErrorsMessages)
Validator.useLang('ar')

module.exports = Validator
