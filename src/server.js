const { makePublisher } = require('amqp-simple-pub-sub')

const exchange = require('src/exchange')
const logger = require('src/utils/logger')
const { setService } = require('src/utils/service')
const listeners = require('src/stores/listeners')

const { AMQP_URL } = require('src/utils/config')

let service
let running = false

/* istanbul ignore next */
const delayThen = (asyncFn, delay = 500) =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      await asyncFn()
      logger.debug('event publisher closed')
      resolve()
    }, delay)
  })

/* istanbul ignore next */
const stop = async () => {
  await listeners.stopAll()
  logger.debug('services closed')
  await delayThen(service.close)
  logger.debug('stopped')
}

/* istanbul ignore next */
const shutItDown = async () => {
  if (running) {
    logger.debug('\nClosing down')
    running = false
    await stop()
  }
}

/* istanbul ignore next */
const doShutdown = () => {
  // see https://en.wikipedia.org/wiki/POSIX_terminal_interface#Controlling_terminals_and_process_groups
  // SIGINT gets sent to all processes so check to see if we are running
  // before trying to shut down the connections.
  shutItDown()
    .then(() => {
      process.exit(0)
    })
    .catch(err => {
      logger.error(err)
      process.exit(1)
    })
}

const start = async () => {
  try {
    service = makePublisher({ exchange, url: AMQP_URL })
    await service.start()

    logger.debug('Service connected', exchange)

    setService(service)

    await listeners.startAll()
    logger.debug('Started Listeners', listeners.keys().join(', '))

    process.on('SIGINT', doShutdown)
    running = true

    return { stop }
  } catch (err) /* istanbul ignore next */ {
    console.log(err)
    logger.error('Could not start the server', err)
    process.exit(1)
  }
}

module.exports = { start }
