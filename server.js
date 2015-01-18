var http = require('http');
var fs = require('fs');
var path = require('path');
var hyperstream = require('hyperstream');

var ecstatic = require('ecstatic');
var st = ecstatic(__dirname + '/static');

var month = require('./lib/month.js');

var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        read('index.html').pipe(hyperstream({
            '#calendar': month(new Date)
        })).pipe(res);
    }
    else st(req, res);
});
server.listen(5000);

function read (file) {
    return fs.createReadStream(path.join(__dirname, 'static', file));
}
