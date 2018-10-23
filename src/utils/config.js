const parseEvents = require('src/utils/parseEvents')

const env = process.env.NODE_ENV || /* istanbul ignore next */ 'development'
const EVENTS = parseEvents()
const AMQP_URL = process.env.AMQP_URL || 'amqp://127.0.0.1'
const EXCHANGE = process.env.EXCHANGE || 'TEST'

module.exports = {
  AMQP_URL,
  EVENTS,
  EXCHANGE,
  env
}
