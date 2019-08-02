const { expect } = require('chai')
const sinon = require('sinon')

const service = require('src/utils/service')

describe('src/utils/service', () => {
  context("there's no service", () => {
    let result

    before(async () => {
      service.setService(undefined)
      result = await service.publish('key', { some: 'message' })
    })

    it('returns undefined', () => {
      expect(result).to.be.undefined
    })
  })

  context("there's a service", () => {
    const fakeService = {
      publish: sinon.stub()
    }

    before(async () => {
      fakeService.publish.resolves()
      service.setService(fakeService)
      await service.publish('key', { some: 'message' })
    })

    after(() => {
      service.setService(undefined)
      fakeService.publish.resetHistory()
    })

    it('invoked publish', () => {
      expect(fakeService.publish).to.have.been.calledOnce
    })
  })
})
