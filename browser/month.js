var render = require('../render/month.js');

module.exports = function (year, month) {
    var date = new Date(year, month);
    var days = document.querySelectorAll('#calendar .day');
    for (var i = 0; i < days.length; i++) {
        var d = days[i];
        if (d.getAttribute('template')) continue;
        d.parentNode.removeChild(d);
    }
    return render(date);
};
