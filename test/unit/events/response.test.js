const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const mockService = require('test/utils/mockService')

describe('src/events/response', () => {
  const response = proxyquire('src/events/response', {
    'src/utils/service': mockService
  })
  const key = 'a-key'
  const data = 'some-data'
  const name = 'test'
  const event = { response: 'say hi' }

  const expected = { name, data, response: event.response }

  const resetStubs = () => {
    mockService.publish.resetHistory()
  }

  before(async () => {
    mockService.publish.resolves()
    await response(key, expected)
  })

  after(resetStubs)

  it('called publish with the right data', () => {
    expect(mockService.publish).to.have.been.calledWith(key, sinon.match(expected))
  })
})
