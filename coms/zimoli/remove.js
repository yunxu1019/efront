function remove(node) {
    if (!node) return;
    var args = isNode(node) ? arguments : node;
    for (var cx = args.length - 1; cx >= 0; cx--) {
        node = args[cx];
        _onremove(node);
        node.parentNode && node.parentNode.removeChild(node);
        if (node.with) {
            remove(node.with);
        }
    }
}

function _onremove(node, event) {
    if (!node.isMounted) return;
    var onremove = node.onremove;
    node.isMounted = false;
    if (!event) {
        event = createEvent("remove");
    }
    dispatch(node, event);
    if (isArray(onremove)) {
        onremove.map(function (remove_hindler) {
            remove_hindler.call(this, event);
        }, node);
    }
    if (isFunction(onremove)) {
        onremove.call(node, event);
    }
    var children = node.children;
    if (children) for (var cx = 0, dx = children.length; cx < dx; cx++) {
        _onremove(children[cx], event);
    }
}