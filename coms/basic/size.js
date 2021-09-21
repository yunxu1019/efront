var KMGT = 'KMGT';
"use ./KMGT.txt"
module.exports = function (f) {
    var log = Math.log(f) / Math.LN2 / 10 | 0;
    f /= Math.pow(2, log * 10);
    f = +f.toFixed(2);
    return f + KMGT.charAt(log - 1) + "B";
};
