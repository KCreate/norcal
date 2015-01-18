var auto = require('autocomplete-element');
var classList = require('class-list');

var month = document.querySelector('#controls [name="month"]');
month.addEventListener('focus', function (ev) { this.select() });

var months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
var cmonth = auto(month, function (c) {
    if (!month.value.length) return c.suggest([]);
    var matches = months.filter(function (m) {
        return lc(m.slice(0, month.value.length)) === lc(month.value);
    });
    c.suggest(matches);
});
function lc (x) { return x.toLowerCase() }
function ucfirst (x) {
    return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
}

month.addEventListener('focus', function () {
    classList(this).add('editing');
});
month.addEventListener('blur', function () {
    classList(this).remove('editing');
});
month.addEventListener('keydown', function (ev) {
    if ((ev.which || ev.keyDown) === 10 || (ev.which || ev.keyDown) === 13) {
        this.blur();
    }
});

var showMonth = require('./month.js');

var mleft = document.querySelector('#controls .month [name="left"]');
mleft.addEventListener('click', function (ev) {
    var ix = months.indexOf(ucfirst(month.value));
    if (ix < 0) return;
    if (ix === 0) year.value = Number(year.value - 1);
    cmonth.set(months[(ix + 11) % 12]);
    showMonth(year.value, (ix + 11) % 12);
});

var year = document.querySelector('#controls [name="year"]');
year.addEventListener('focus', function (ev) { this.select() });
