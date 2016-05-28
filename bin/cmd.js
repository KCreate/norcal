#!/usr/bin/env node

var minimist = require('minimist')
var path = require('path')
var homedir = require('os-homedir')

var argv = minimist(process.argv.slice(2), {
  alias: { h: 'help', d: 'datadir' },
  default: { datadir: path.join(homedir(), '.norcal') }
})

// ...
