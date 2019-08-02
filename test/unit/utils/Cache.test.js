const { expect } = require('chai')

const Cache = require('src/utils/Cache')

describe('src/utils/Cache', () => {
  let cache
  let result

  const key = 'key'
  const value = 'value'

  describe('set and get', () => {
    before(() => {
      cache = Cache.create()
      cache.set(key, value)
      result = cache.get(key)
    })

    it('returns the right value', () => {
      expect(result).to.equal(value)
    })
  })

  describe('clear', () => {
    before(() => {
      cache = Cache.create()
      cache.set(key, value)
      cache.clear(key)
      result = cache.get(key)
    })

    it('clears the given key from the cache', () => {
      expect(result).to.be.undefined
    })
  })

  describe('keys', () => {
    before(() => {
      cache = Cache.create()
      cache.set(key, value)
      result = cache.keys()
    })

    it('returns the correct keys', () => {
      expect(result).to.deep.equal([key])
    })
  })

  describe('reset', () => {
    before(() => {
      cache = Cache.create()
      cache.set(key, value)
      cache.reset()
      result = cache.get(key)
    })

    it('cleared the cache', () => {
      expect(result).to.be.undefined
    })
  })
})
