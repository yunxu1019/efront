var sortRegister = function (list) {
    var found = 0;
    a: for (var cx = 0, dx = list.length; cx < dx; cx++) {
        for (var cy = found + 1, dy = dx; cy < dy; cy++) {
            if (cy !== cx && list[cy].indexOf(list[cx]) >= 0) continue a;
        }
        if (found !== cx) {
            var temp = list[found];
            list[found] = list[cx];
            list[cx] = temp;
        }
        cx = found++;
    }
    return list;
}
module.exports = sortRegister;