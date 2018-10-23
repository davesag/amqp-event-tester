let theService

const setService = service => {
  theService = service
}

const encode = json => Buffer.from(JSON.stringify(json))

const publish = async (key, message) =>
  theService && typeof theService.publish === 'function'
    ? theService.publish(key, encode(message))
    : undefined

module.exports = {
  setService,
  publish
}
