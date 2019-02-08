require('dotenv').config()
const Server = require('src/server')
const logger = require('src/utils/logger')

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled rejection in promise', p, 'caused by', reason)
})

Server.start()
