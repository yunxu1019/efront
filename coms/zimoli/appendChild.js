var slice = [].slice;

function release(node) {
    return isFunction(node) ? node() : isNode(node) ? node : document.createTextNode(node);
}

function _onappend(node, event) {
    if (!event) {
        event = createEvent("append");
    }
    dispatch(node, event);
    node.isMounted = true;
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
            parent.appendChild(o);
            o.with && appendChild(parent, o.with);
            if (parent.isMounted)
                _onappend(o);
        }
    }
    return parent;
}