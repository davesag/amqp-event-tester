const Cache = require('src/utils/Cache')
const { EVENTS } = require('src/utils/config')
const genericSubscriber = require('src/utils/genericSubscriber')
const response = require('src/events/response')
const logger = require('src/utils/logger')

const cache = Cache.create()

cache.startAll = async function() {
  const keys = Object.keys(EVENTS)
  for (const key of keys) {
    const event = EVENTS[key]
    /* istanbul ignore next */
    const makeHandler = (service, name) => async message => {
      const data = JSON.parse(message.content.toString())
      logger.debug('heard', key)
      logger.debug('data', data)
      if (event.response) {
        const rData = event.data || {}
        logger.debug('emit', event.response)
        logger.debug('with data', rData)
        await response(event.response, rData)
      }
      service.ack(message)
    }
    const subscriber = genericSubscriber(event.queue, [key], makeHandler)
    const started = await subscriber.start(key)
    this.set(key, started)
  }
}

cache.stopAll = async function() {
  await Promise.all(Object.values(this.database).map(({ close }) => close()))
  this.reset()
}

cache.purgeAll = async function() {
  await Promise.all(
    Object.values(this.database).map(({ purgeQueue }) => purgeQueue())
  )
}

module.exports = cache
