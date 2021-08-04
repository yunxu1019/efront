// 部分逻辑参考 https://www.cnblogs.com/ycloneal/p/5191256.html
const MAX_FREQUENCY = 0XFFFF;
class BitTree extends Array {
    counts = [];
    length = 0;
    total = 0;
    constructor(arr) {
        if (isFinite(arr)) {
            arr = new Array(arr);
            for (var cx = 0, dx = arr.length; cx < dx; cx++)arr[cx] = 1;
        }
        if (!arr || !arr.length) throw new Error("参数错误！");
        this.counts = arr;
        this.length = arr.length + 1;
        this.total = arr.length;
        for (var cx = 0, dx = this.length; cx < dx; cx++)this[cx] = 0;
        for (var cx = 1, dx = this.length; cx < dx; cx++) {
            var k = cx;
            while (k < dx) {
                this[k] += arr[cx - 1];
                k += k & -k;
            }
        }
    }
    count(index) {
        if (this.counts[index] >= MAX_FREQUENCY) {
            var arr = this.counts;
            for (var cx = 0, dx = arr.length; cx < dx; cx++) {
                arr[cx] = arr[cx] + 1 >>> 1;
            }
            this.total = this.sumTo(this.length);
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
    find(ef) {
        var dx = this.counts.length;
        var cx = 1;
        while (cx + 1 < dx) {
            var ci = cx + dx >> 1;
            var a = this.sumTo(ci);
            if (a > ef) {
                dx = a;
            }
            else {
                cx = a;
            }
        }
        return cx - 1;
    }
}