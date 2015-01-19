#!/usr/bin/env node

var http = require('http');
var minimist = require('minimist');
var isroot = require('is-root');
var fs = require('fs');
var path = require('path');

var argv = minimist(process.argv.slice(2), {
    alias: { h: 'help', p: 'port' },
    default: { port: isroot ? 80 : 8000 }
});

if (argv.help || argv._[0] === 'help') {
    usage(0);
}
else if (argv._[0] === 'server') {
    var server = http.createServer(require('../server.js'));
    server.listen(argv.port, function () {
        console.log('listening on :' + server.address().port);
    });
}
else usage(1);

function usage (code) {
    var r = fs.createReadStream(path.join(__dirname, 'usage.txt'));
    r.pipe(process.stdout);
    r.on('end', function () {
        if (code) process.exit(code);
    });
}
