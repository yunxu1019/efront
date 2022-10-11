function keysFrom() {
    var args = Array.prototype.slice.call(arguments, 0, arguments.length);
    args.unshift(Object.create(null));
    return Object.keys(extendIfNeeded.apply(null, args));
}