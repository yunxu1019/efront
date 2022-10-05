function isArrayLike(a) {
    if (a === null || typeof a !== 'object' || isNode(a)) return false;
    if (isFinite(a.length)) {
        if (a.length > 0) {
            return a.length - 1 in a;
        }
        return true;
    }
    return false;
}