const { expect } = require('chai')
const { stub, restore } = require('sinon')
const proxyquire = require('proxyquire')

const mockLogger = require('test/utils/mockLogger')

describe('src/stores/listeners', () => {
  const fakeListener = {
    close: stub(),
    purgeQueue: stub(),
    start: stub()
  }

  const key = 'test-listener'
  const fakeConfig = {
    EVENTS: {
      [key]: {
        queue: 'test-queue',
        response: 'test-response',
        data: { test: 'data' }
      }
    }
  }
  const mockGenericSubscriber = stub()

  const listenerStore = proxyquire('src/stores/listeners', {
    'src/utils/config': fakeConfig,
    'src/utils/genericSubscriber': mockGenericSubscriber,
    'src/utils/logger': mockLogger
  })

  describe('startAll', () => {
    before(async () => {
      listenerStore.reset()
      fakeListener.start.resolves(fakeListener)
      mockGenericSubscriber.returns(fakeListener)

      await listenerStore.startAll()
    })

    after(() => {
      restore()
      listenerStore.reset()
    })

    it('created a subscriber', () => {
      expect(mockGenericSubscriber).to.have.been.calledWith(
        fakeConfig.EVENTS[key].queue,
        [key]
      )
    })

    it('started the listener', () => {
      expect(fakeListener.start).to.have.been.calledWith(key)
    })

    it('saved the listener', () => {
      expect(listenerStore.get(key)).to.deep.equal(fakeListener)
    })
  })

  describe('stopAll', () => {
    before(async () => {
      listenerStore.reset()
      fakeListener.close.resolves()
      listenerStore.set('test', fakeListener)
      await listenerStore.stopAll()
    })

    after(() => {
      restore()
      listenerStore.reset()
    })

    it("invoked the listener's stop function", () => {
      expect(fakeListener.close).to.have.been.calledOnce
    })
  })

  describe('purgeAll', () => {
    before(async () => {
      listenerStore.reset()
      fakeListener.purgeQueue.resolves()
      listenerStore.set('test', fakeListener)
      await listenerStore.purgeAll()
    })

    after(() => {
      restore()
      listenerStore.reset()
    })

    it("invoked the listener's purgeQueue function", () => {
      expect(fakeListener.purgeQueue).to.have.been.calledOnce
    })
  })
})
