function checkRange(from, to) {
    if (!isFinit(from) || !isFinit(to)) throw Error('边界异常！');
    if (from > to) throw new Error(`左边界${from}大于右边界${to}！`);
}
function copyCaped(copyto, caped) {
    copyto.length = caped.length;
    for (var cx = 0, dx = copyto.length; cx < dx; cx++) {
        copyto[cx] = caped[cx];
    }
}
// 包含from不包含to，步进单位是1
function SliceRange(from, to) {
    checkRange(from, to);
    if (!this || this.constructor !== SliceRange) return new SliceRange(from, to);
    this[0] = [from, to];
    this.length = 1;
}

SliceRange.prototype.delete = function (from, to) {
    checkRange(from, to);
    var caped = [];
    for (var cx = 0, dx = this.length; cx < dx; cx++) {
        var [m, n] = this[cx];
        delete this[cx];
        if (m >= from && n <= to) continue;
        if (n < from || m > to) {
            caped.push([m, n]);
            continue;
        }
        if (m < from) {
            caped.push([m, from]);
        }
        if (n > to) {
            caped.push([to, n]);
        }
    }
    copyCaped(this, caped);
};

SliceRange.prototype.add = function (from, to) {
    checkRange(from, to);
    var caped = [];
    var pushed = false;
    for (var cx = 0, dx = this.length; cx < dx; cx++) {
        var [m, n] = this[cx];
        delete this[cx];
        if (n < from) {
            caped.push([m, n]);
            continue;
        }
        if (m > to) {
            if (!pushed) {
                caped.push([from, to]);
                pushed = true;
            }
            caped.push([m, n]);
            continue;
        }
        if (m >= from) {
            m = from;
        }
        if (n <= to) {
            n = to;
        }
        from = m, to = n;
    }
    if (!pushed) caped.push([from, to]);
    copyCaped(this, caped);
}
SliceRange.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];