// 组合工具
var isEmpty = require("../basic/isEmpty");
var str2array = require("./str2array");
var combine = require("../basic/combine");
function minxin() {
    var argsList = [].map.call(arguments, a => {
        var res = [];
        if (a instanceof Array) {
            new Set(a).forEach(a => res.push(a));
        } else if (typeof a === 'string') {
            new Set(str2array(a).map(
                a => a.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/^/, '').trim()
            )).forEach(a => res.push(a));
        } else if (!isEmpty(a)) {
            res.push(a);
        }
        return res;
    });
    var dist = combine(...argsList);
    return dist;
}
module.exports = minxin;