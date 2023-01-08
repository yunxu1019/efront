var decodeUTF8 = require("../basic/decodeUTF8");
var encodeUTF16 = require("../basic/encodeUTF16");
function rc2unicode(buff) {
    var dist = [];
    decodeUTF8(buff).split("").forEach(function (a) {
        var buff = encodeUTF16(a, false);
        dist.push.apply(dist, buff);
    });
    return dist;
}
module.exports = rc2unicode;