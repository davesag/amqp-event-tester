const parseEvents = (data = process.env.EVENTS) => {
  try {
    const jstr = Buffer.from(data, 'base64').toString()
    return JSON.parse(jstr)
  } catch (err) {
    return {}
  }
}

module.exports = parseEvents
