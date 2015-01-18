var auto = require('autocomplete-element');

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
function lc (x) { return x.toLowerCase() }

var year = document.querySelector('#controls [name="month"]');
year.addEventListener('focus', function (ev) { this.select() });
