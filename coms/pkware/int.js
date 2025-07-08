function int(n) {
    var dist = [];
    while (n > 0) {
        dist.push(n & 0xff);
        n = n / 256 | 0;
    }
    dist.reverse();
    return dist;
}
