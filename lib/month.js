var fs = require('fs');
var path = require('path');
var readonly = require('read-only-stream');

var month = require('../render/month.js');

module.exports = function (date) {
    return readonly(read('calendar.html').pipe(month(date)));
};

function read (file) {
    return fs.createReadStream(path.join(__dirname, '../static', file));
}
