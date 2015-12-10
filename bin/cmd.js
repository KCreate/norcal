#!/usr/bin/env node

var http = require('http')
var minimist = require('minimist')
var fs = require('fs')
var path = require('path')
var homedir = require('os-homedir')

var argv = minimist(process.argv.slice(2), {
  alias: { h: 'help', d: 'datadir' },
  default: { datadir: path.join(homedir(), '.norcal') }
})

if (argv.help || argv._[0] === 'help') usage(0)
else if (argv._.length === 0) {
  getbin().showMonth()
} else usage(1)

function usage (code) {
  var r = fs.createReadStream(path.join(__dirname, 'usage.txt'))
  r.pipe(process.stdout)
  if (code) r.on('end', function () { process.exit(code) })
}

function getbin () {
  return require('./')(argv.datadir)
}
