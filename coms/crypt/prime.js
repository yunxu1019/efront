var prime = [2, 3];
var updatePrime = function (m) {
    var n = prime[prime.length - 1];
    var i = 1;
    a: while (n < m) {
        n += 2;
        if (prime[i] * prime[i] < n) i++;
        for (var cx = 0, dx = i + 1; cx < dx; cx++) {
            if (n % prime[cx] === 0) continue a;
        }
        prime.push(n);
    }
}
var isPrime = function (s, int) {
    return 最小素约数(s, int) === s;
};

var 分解因数 = function (s) {
    var r = [];
    do {
        var d = 最小素约数(s);
        r.push(d);
        s = s / d;
    } while (s >= d);
    return r;
};
var 公约数 = function (a, b) {
    var r1 = 分解因数(a);
    var r2 = 分解因数(b);
    var i1 = 0, i2 = 0;
    var s = [];
    while (i1 < r1.length && i2 < r2.length) {
        var a1 = r1[i1], a2 = r2[i2];
        if (a1 === a2) {
            i1++, i2++;
            s.push(a1);
            continue;
        }
        if (a1 < a2) {
            i1++;
        }
        else {
            i2++;
        }
    }
    return s;
};

var 最小素约数 = function (s, int = typeof s === 'bigint' ? BigInt : Number) {
    var n = Math.sqrt(Number(s));
    var 零 = int(0);
    if (n > prime[prime.length - 1]) updatePrime(n);
    for (var cx = 0; prime[cx] <= n; cx++)if (s % int(prime[cx]) === 零) return int(prime[cx]);
    return s;
};

var 测试梅森素数 = function (p) {
    // 仅bigint;
    if (!isPrime(p)) return false;
    if (typeof p !== 'bigint') p = BigInt(p);
    var 二 = BigInt(2);
    var 一 = BigInt(1);
    var 零 = BigInt(0);
    var Mp = 二 ** p - 一;
    var 四 = BigInt(4);
    var L0 = 四;
    var Lm = n => (n * n - 二) % Mp;
    var Ln = L0;
    for (var cx = 一, dx = p - 一; cx < dx; cx++) {
        Ln = Lm(Ln);
    }
    return Ln === 零;
};
prime.isPrime = isPrime;
prime.mtest = 测试梅森素数;
prime.minFactor = 最小素约数;
prime.factorize = 分解因数;
prime.cd = 公约数;

prime.find = function (start, delta, end) {
    var isBigInt = typeof start === 'bigint' || typeof end === 'bigint';
    var n = [0, 1, 2];
    if (isBigInt) {
        start = BigInt(start);
        delta = BigInt(delta);
        n = n.map(BigInt);
    } else {
        start = Number(start);
        delta = Number(delta);
    }
    if (!(delta > n[0]) && !(delta < n[0])) {
        return isPrime(start);
    }
    if (delta != n[1] && delta != -n[1] && start % delta == n[0]) {
        return null;
    }

    if (delta % n[1]) return null;
    if (start % n[2] === n[0]) {
        start += delta > n[0] ? n[1] : -n[1];
    }
    if (delta === n[1] || delta === -n[1]) {
        delta *= n[2];
    }
    if (end) {
        var res = [];
        if (isBigInt) end = BigInt(end);
        else end = Number(end);
        for (var cx = start, dx = end + n[1], ex = delta; ex > n[0] ? cx < dx : cx > dx; cx += ex) {
            if (isPrime(cx)) res.push(cx);
        }
    } else {
        while (!isPrime(start)) start += delta;
        var res = start;
    }
    return res;

};