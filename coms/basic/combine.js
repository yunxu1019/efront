function combine() {
    var total = 1;
    var argsList = Array.prototype.map.call(arguments, a => {
        total *= a.length;
        return a;
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
module.exports = combine;