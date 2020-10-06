const { makeSubscriber } = require('amqp-simple-pub-sub')

const exchange = require('src/exchange')
const { AMQP_URL } = require('src/utils/config')

const genericSubscriber = (queueName, routingKeys, makeHandler) => {
  const makeService = () => makeSubscriber({ exchange, queueName, routingKeys, url: AMQP_URL })

  const start = async name => {
    const service = makeService()
    const handler = makeHandler(service, name)
    await service.start(handler)
    return service
  }

  return { start }
}

module.exports = genericSubscriber
