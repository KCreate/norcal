#!/usr/bin/env node

var minimist = require('minimist')
var path = require('path')
var homedir = require('os-homedir')
var norcal = require('../')
var hyperlog = require('hyperlog')
var level = require('level')
var mkdirp = require('mkdirp')

var argv = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    d: 'datadir',
    m: ['msg','message'],
    t: 'time'
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
  var opts = { created: argv.created, value: argv.v }
  cal.add(argv.time, opts, function (err) {
    if (err) exit(err)
  })
} else if (argv._[0] === 'query') {
  cal.query(argv).on('data', function (row) {
    console.log(row)
  })
}

function exit (err) {
  console.error(err.message)
  process.exit(1)
}
