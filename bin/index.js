var level = require('level')
var hyperlog = require('hyperlog')
var path = require('path')
var through = require('through2')
var mkdirp = require('mkdirp')
var Cal = require('../')

module.exports = Bin

function Bin (dir) {
  if (!(this instanceof Bin)) return new Bin(dir)
  mkdirp.sync(dir)
  this.ldb = level(path.join(dir, 'log'))
  this.idb = level(path.join(dir, 'index'))
  this.log = hyperlog(this.ldb, { valueEncoding: 'json' })
  this.cal = Cal({ log: this.log, db: this.idb })
}

Bin.prototype.showMonth = function () {
  var r = this.log.createReadStream()
  r.pipe(through.obj(write))
  function write (row, enc, next) {
    console.log(row)
    next()
  }
}

Bin.prototype.createEvent = function (ev) {
  this.cal.createEvent(ev, function (err, node) {
    if (err) exit(err)
    else console.log(node.key)
  })
}

function exit (err) {
  console.error(err.message)
  process.exit(1)
}
