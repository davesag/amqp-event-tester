const { expect } = require('chai')

const parseEvents = require('src/utils/parseEvents')

describe('src/utils/parseEvents', () => {
  let result

  context('given invalid data', () => {
    before(() => {
      result = parseEvents('some crap')
    })

    it('parsed as expected', () => {
      expect(result).to.deep.equal({})
    })
  })
  context('given valid data', () => {
    const data = {
      test: {
        queue: 'test-queue',
        response: 'test-response'
      }
    }
    const encoded = Buffer.from(JSON.stringify(data)).toString('base64')

    before(() => {
      result = parseEvents(encoded)
    })

    it('parsed as expected', () => {
      expect(result).to.deep.equal(data)
    })
  })
})
