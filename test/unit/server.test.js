const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire').noCallThru()

const mockLogger = require('test/utils/mockLogger')

describe('src/server', () => {
  const mockListeners = {
    startAll: stub(),
    keys: stub().returns([])
  }
  const mockPubSub = { makePublisher: stub() }
  const fakeService = { start: stub() }
  const mockServiceCache = {
    setService: stub()
  }

  const server = proxyquire('src/server', {
    'src/stores/listeners': mockListeners,
    'src/utils/logger': mockLogger,
    'amqp-simple-pub-sub': mockPubSub,
    'src/utils/service': mockServiceCache
  })

  let outcome

  before(async () => {
    mockPubSub.makePublisher.returns(fakeService)
    mockListeners.startAll.resolves()
    outcome = await server.start()
  })

  after(() => {
    mockLogger.debug.resetHistory()
    fakeService.start.resetHistory()
    mockServiceCache.setService.resetHistory()
    mockPubSub.makePublisher.resetHistory()
  })

  it('makes a publisher', () => {
    expect(mockPubSub.makePublisher).to.have.been.calledOnce
  })

  it('starts the service', () => {
    expect(fakeService.start).to.have.been.calledOnce
  })

  it('saves the service', () => {
    expect(mockServiceCache.setService).to.have.been.calledWith(fakeService)
  })

  it('started the listeners', () => {
    expect(mockListeners.startAll).to.have.been.calledOnce
  })

  it('returns a stop function', () => {
    expect(outcome).to.have.property('stop')
  })
})
