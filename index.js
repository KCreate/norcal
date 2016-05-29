var hyperkv = require('hyperkv')
var hcali = require('hyperlog-calendar-index')
var sub = require('subleveldown')
var xtend = require('xtend')
var randombytes = require('randombytes')

var KV = 'k', CAL = 'c'

module.exports = Cal

function Cal (opts) {
  var self = this
  if (!(self instanceof Cal)) return new Cal(opts)
  self.log = opts.log
  self.kv = hyperkv({
    log: self.log,
    db: sub(opts.db, KV)
  })
  self.cal = hcali({
    log: self.log,
    db: sub(opts.db, CAL),
    map: map
  })
  function map (row) {
    var v = row.value
    if (!v) return null
    else if (v.d !== undefined) {
      return xtend(v, { type: 'del' })
    } else if (v.k !== undefined) {
      return xtend(v.v, { type: 'put' })
    }
  }
}

Cal.prototype.add = function (time, opts, cb) {
  var id = randombytes(8).toString('hex')
  this.kv.put(id, xtend(opts, { time: time }), cb)
}

Cal.prototype.query = function (opts, cb) {
  return this.cal.query(opts, cb)
}
