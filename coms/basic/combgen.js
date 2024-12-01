function* combgen() {
    var total = 1;
    var argsList = Array.prototype.map.call(arguments, a => {
        total *= a.length;
        return a;
    });
    var temp = total;
    var ratioList = argsList.map(a => temp = temp / a.length);
    var i = 0;
    for (var cx = 0, dx = total; cx < dx; cx++) {
        var temp = cx;
        var res = yield argsList.map(function (a, cx) {
            var index = temp / ratioList[cx] | 0;
            temp = temp - index * ratioList[cx];
            return a[index];
        });
        if (res === false) {
            i++;
            if (i > argsList.length) break;
            var tx = argsList[argsList.length - i].length;
            cx += tx - cx % tx - 1;
        }
        else {
            i = 0;
        }
    }
}