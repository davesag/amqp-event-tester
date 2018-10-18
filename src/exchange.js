const { env, EXCHANGE: base } = require('src/utils/config')

/* istanbul ignore next */
const exchange = () => {
  switch (env) {
    case 'test':
      return `${base}_TEST`
    case 'production':
      return base
    default:
      return `${base}_DEVELOPMENT`
  }
}

module.exports = exchange()
