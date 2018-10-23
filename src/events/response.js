const { publish } = require('src/utils/service')

const response = async (key, message) => publish(key, message)

module.exports = response
