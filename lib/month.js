var fs = require('fs');
var path = require('path');
var template = require('html-template');
var monthdays = require('month-days');
var readonly = require('read-only-stream');

module.exports = function (date) {
    var Y = date.getFullYear()
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var first = new Date(Y + '-' + M + '-01 00:00');
    var mdays = monthdays(Y, M - 1);
    
    var html = template();
    var days = html.template('day');
    for (var i = 0; i < first.getDay(); i++) {
        days.write({ '*': { class: { append: ' empty' } } });
    }
    for (var i = 1; i <= mdays; i++) {
        days.write({ '.date': i });
    }
    days.end();
    
    read('calendar.html').pipe(html)
    return readonly(html);
};

function read (file) {
    return fs.createReadStream(path.join(__dirname, '../static', file));
}
