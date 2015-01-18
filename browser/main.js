var auto = require('autocomplete-element');
var classList = require('class-list');

var month = document.querySelector('#controls [name="month"]');
month.addEventListener('focus', function (ev) { this.select() });

var months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
auto(month, function (c) {
    if (!month.value.length) return c.suggest([]);
    var matches = months.filter(function (m) {
        return lc(m.slice(0, month.value.length)) === lc(month.value);
    });
    c.suggest(matches);
});
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

function lc (x) { return x.toLowerCase() }

var year = document.querySelector('#controls [name="month"]');
year.addEventListener('focus', function (ev) { this.select() });
