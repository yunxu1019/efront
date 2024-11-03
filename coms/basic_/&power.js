var BigInt = window.BigInt;
return BigInt ? function power_(a, b) {
    if (typeof a !== 'bigint') {
        return Math.pow(a, b);
    }
    var u = BigInt(1);
    var result = u;
    while (b) {
        if (b & u) result *= a;
        a *= a;
        b >>= u;
    }
    return result;
} : Math.pow;