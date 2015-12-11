var xtend = require('xtend')
var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter
var hindex = require('hyperlog-index')
var parseSch = require('parse-messy-schedule')
var sub = require('subleveldown')

module.exports = Cal
inherits(Cal, EventEmitter)

function Cal (opts) {
  if (!(this instanceof Cal)) return new Cal(opts)
  var self = this
  self.log = opts.log
  self.db = opts.db
  self.idb = sub(self.db, 'i', { valueEncoding: 'json' })
  self.dex = hindex(self.log, self.idb, function (row, next) {
    console.log('row=', row)
    next()
  })
}

Cal.prototype.getEvents = function (opts) {
  return this.log.createReadStream()
}

Cal.prototype.createEvent = function (ev, cb) {
  var before = { time: new Date().toISOString() }
  var after = { type: 'event' }
  if (typeof ev === 'string') ev = { text: ev }
  var doc = xtend(before, xtend(ev, after))
  this.log.append(doc, cb)
}

Cal.prototype.checkIn = function (ev) {
  var before = { time: new Date().toISOString() }
  var after = { type: 'check-in' }
  if (typeof ev === 'string') ev = { event: ev }
  // include estimate for attendance
  var doc = xtend(before, xtend(ev, after))
  this.log.append(doc, cb)
}

Cal.prototype.rsvp = function (ev, cb) {
  var before = { time: new Date().toISOString() }
  var after = { type: 'rsvp' }
  if (typeof ev === 'string') ev = { event: ev }
  var doc = xtend(before, xtend(ev, after))
  this.log.append(doc, cb)
}
