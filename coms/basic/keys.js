function keysFrom() {
    var args = [].slice.call(arguments, 0, arguments.length);
    args.unshift(Object.create(null));
    return Object.keys(extend.apply(null, args));
}
var main = keysFrom;