var http = require('http');
var fs = require('fs');
var path = require('path');

var hyperstream = require('hyperstream');
var template = require('html-template');

var ecstatic = require('ecstatic');
var st = ecstatic(__dirname + '/static');

var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        var html = template();
        var days = html.template('day');
        days.write({ '.date': 1 });
        days.write({ '.date': 2 });
        days.write({ '.date': 3 });
        days.write({ '.date': 4 });
        days.end();
        
        read('index.html').pipe(hyperstream({
            '#calendar': read('calendar.html').pipe(html)
        })).pipe(res);
    }
    else st(req, res);
});
server.listen(5000);

function read (file) {
    return fs.createReadStream(path.join(__dirname, 'static', file));
}
