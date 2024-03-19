// 部分逻辑参考 https://www.cnblogs.com/ycloneal/p/5191256.html

const MAX_FREQUENCY = 0XFFFF;
class BitTree extends Array {
    counts = [];
    total = 0;
    constructor(arr, a) {
        super();
        if (isFinite(arr)) {
            arr = new Array(arr);
            if (a === undefined) a = 1;
            for (var cx = 0, dx = arr.length; cx < dx; cx++)arr[cx] = a;
        }
        if (!arr || !arr.length) throw new Error(i18n`参数错误！`);
        this.counts = arr;
        this.rebuild();
    }
    rebuild() {
        var arr = this.counts;
        this.length = arr.length + 1;
        for (var cx = 0, dx = this.length; cx < dx; cx++)this[cx] = 0;
        for (var cx = 1, dx = this.length; cx < dx; cx++) {
            var k = cx;
            while (k < dx) {
                this[k] += arr[cx - 1];
                k += k & -k;
            }
        }
        this.total = this.sumTo(arr.length);
    }
    count(index) {
        if (this.total >= MAX_FREQUENCY) {
            var arr = this.counts;
            for (var cx = 0, dx = arr.length; cx < dx; cx++) {
                arr[cx] = arr[cx] + 1 >>> 1;
            }
            this.rebuild();
        }
        this.update(index, this.counts[index] + 1);
        this.total++;

    }
    update(index, val) {
        var a = val - this.counts[index];
        var k = index + 1;
        while (k < this.length) {
            this[k] += a;
            k += k & -k;
        }
        this.counts[index] = val;
    }
    sumTo(end) {
        var sum = 0;
        var k = end;
        while (k) {
            sum += this[k];
            k -= k & -k;
        }
        return sum;
    }
    sumRange(start, end) {
        return this.sumTo(end + 1) - this.sumTo(start);
    }
    find2(ef) {
        var res = 0;
        var mask = this.counts.length >>> 1;
        var id;
        while (mask !== 0) {
            id = res + mask;
            if (ef === this[id]) {
                res = id;
                break;
            }
            if (ef > this[id]) {
                res = id;
                ef -= this[id];
            }
            mask = mask >>> 1;
        }
        return res;
    }
    find(ef) {
        var dx = this.counts.length;
        var cx = 0;
        while (cx + 1 < dx) {
            var ci = cx + dx >> 1;
            var a = this.sumTo(ci);
            if (a > ef) {
                dx = ci;
            }
            else {
                cx = ci;
            }
        }
        return cx;
    }
}