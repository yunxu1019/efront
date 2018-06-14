var slice = [].slice;

function release(node) {
    if (node === null || node === undefined) return node;
    return isFunction(node) ? node() : isNode(node) ? node : document.createTextNode(node);
}

function _onappend(node, event) {
    if (node.isMounted) return;
    node.isMounted = true;
    if (!event) {
        event = createEvent("append");
    }
    dispatch(node, event);
    var onappend = node.onappend;
    if (isArray(onappend)) {
        onappend.map(function (append_handler) {
            append_handler.call(this, event);
        }, node);
    }
    if (isFunction(onappend)) {
        onappend.call(node, event);
    }
    var children = node.children;
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        _onappend(children[cx], event);
    }
}
_onappend(document.documentElement);

function appendChild(parent, obj) {
    var children = isArray(obj) ? slice.call(obj, 0) : slice.call(arguments, 1);
    if (parent.appendChild) {
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var o = release(children[cx]);
            if (!o) continue;
            parent.appendChild(o);
            o.with && appendChild(parent, o.with);
            if (parent.isMounted)
                _onappend(o);
        }
    }
    return parent;
}
function insertBefore(alreadyMounted, obj) {
    var parent = alreadyMounted && alreadyMounted.parentNode;
    if (!parent || !parent.insertBefore) return;
    var children = isArray(obj) ? slice.call(obj, 0) : slice.call(arguments, 1);
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        var o = release(children[cx]);
        parent.insertBefore(o, alreadyMounted);
        o.with && insertBefore(o, o.with);
        if (parent.isMounted)
            _onappend(o);
    }
};
appendChild.before = insertBefore;