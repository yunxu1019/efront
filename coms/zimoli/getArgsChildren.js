var getArgsChildren = function (args, from = 1) {
    var obj = args[from];
    if (isArray(obj) && !obj.with) return obj;
    var transition = args[from + 1];
    var children;
    if (isArrayLike(obj)) {
        children = Array.apply(null, obj);
        var ith = obj.with;
        while (ith) {
            if (isNode(ith)) children.push(ith), ith = null;
            else if (isArray(ith)) children.push.apply(children, ith), ith = ith.with;
            else ith = null;
        }
    }
    else if (transition === false || transition === true || !isHandled(obj)) {
        children = [].concat(obj);
    }
    else {
        children = Array.prototype.slice.call(args, from);
    }
    return children;
}