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
var isPrime = function (s) {
    var n = Math.sqrt(Number(s));
    s = BigInt(s);
    if (n > prime[prime.length - 1]) updatePrime(n);
    for (var cx = 0; prime[cx] < n; cx++)if (s % BigInt(prime[cx]) === 0n) return false;
    return true;
};
prime.isPrime = isPrime;
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