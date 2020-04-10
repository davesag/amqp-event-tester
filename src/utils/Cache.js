function Cache() {
  this.database = {}
}

Cache.prototype.get = function (key) {
  return this.database[key]
}

Cache.prototype.set = function (key, value) {
  this.database[key] = value
}
Cache.prototype.clear = function (key) {
  delete this.database[key]
}
Cache.prototype.keys = function () {
  return Object.keys(this.database)
}

Cache.prototype.reset = function () {
  this.database = {}
}

Cache.create = () => new Cache()

module.exports = Cache
