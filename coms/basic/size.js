var KMGT = 'KMGT';
"use ./KMGT.txt"
module.exports = function (f, fix) {
    var log = Math.log(f) / Math.LN2 / 10 | 0;
    f /= Math.pow(2, log * 10);
    f = f.toFixed(fix >= 0 ? fix : 2);
    if (!fix) f = +f;
    return f + KMGT.charAt(log - 1) + "B";
};
