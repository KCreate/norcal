#!/usr/bin/env node

var minimist = require('minimist')
var path = require('path')
var homedir = require('os-homedir')
var norcal = require('../')
var hyperlog = require('hyperlog')
var level = require('level')
var mkdirp = require('mkdirp')
var calmonth = require('calendar-month-string')

var argv = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    d: 'datadir',
    m: ['msg','message'],
    v: 'value',
    t: 'title'
  },
  default: {
    datadir: path.join(homedir(), '.norcal'),
    created: new Date
  }
})
mkdirp.sync(argv.datadir)

var db = {
  log: level(path.join(argv.datadir, 'log.db')),
  index: level(path.join(argv.datadir, 'index.db'))
}
var cal = norcal({
  log: hyperlog(db.log, { valueEncoding: 'json' }),
  db: db.index
})

if (argv._[0] === 'add') {
  var value = { title: argv.title }
  var opts = { created: argv.created, value: value }
  cal.add(argv._.join(' '), opts, function (err) {
    if (err) exit(err)
  })
} else if (argv._[0] === 'query') {
  var opts = monthRange(new Date)
  cal.query(opts).on('data', function (row) {
    console.log(row)
  })
} else if (argv._[0] === 'rm') {
  cal.remove(argv._[1], function (err) {
    if (err) exit(err)
  })
} else {
  var date = new Date
  cal.query(monthRange(date), function (err, docs) {
    if (err) return exit(err)
    var colors = {}
    docs.forEach(function (doc) {
      var d = doc.time.getDate()
      if (date.getDate() === d) {
        colors[d] = 'reverse cyan'
      } else {
        colors[d] = 'cyan'
      }
    })
    console.log(calmonth(new Date, { colors: colors }))
  })
}

function exit (err) {
  console.error(err.message)
  process.exit(1)
}

function monthRange (date) {
  var first = new Date(date)
  first.setHours(0)
  first.setMinutes(0)
  first.setSeconds(0)
  first.setDate(1)
  var last = new Date(date)
  last.setHours(0)
  last.setMinutes(0)
  last.setSeconds(0)
  last.setMonth(date.getMonth()+1)
  last.setDate(1)
  return { gt: first, lt: last }
}
