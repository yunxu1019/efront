// 组合工具
function minxin() {
    var total = 1;
    var argsList = [].map.call(arguments, a => {
        var res = [];
        if (a instanceof Array) {
            new Set(a).forEach(a => res.push(a));
        } else if (typeof a === 'string') {
            new Set(a.split(/[,;]/)).forEach(a => res.push(a));
        } else {
            res.push(a);
        }
        total *= res.length;
        return res;
    });
    var temp = total;
    var ratioList = argsList.map(a => temp = temp / a.length);
    var dist = new Array(total);
    for (var cx = 0, dx = total; cx < dx; cx++) {
        var temp = cx;
        dist[cx] = argsList.map(function (a, cx) {
            var index = temp / ratioList[cx] | 0;
            temp = temp - index * ratioList[cx];
            return a[index];
        });
    }
    return dist;
}
module.exports = minxin;