const { start } = require('src/server')

let stop

before(async () => {
  console.log('starting tests')
  ;({ stop } = await start())
})

after(async () => {
  console.log('ending tests')
  try {
    await stop()
  } catch (err) {
    console.error('could not end tests cleanly.', err)
  }
})
