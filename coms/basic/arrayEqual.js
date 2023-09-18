function sliceEqual(a, b) {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    for (var cx = 0, dx = a.length; cx < dx; cx++) {
        if (!isSame(a[cx], b[cx])) return false;
    }
    return true;
}