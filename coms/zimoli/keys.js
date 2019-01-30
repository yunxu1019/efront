function keysFrom() {
    return Object.keys(extend.apply(null, [].concat.apply([{}], arguments)));
}
var main = keysFrom;