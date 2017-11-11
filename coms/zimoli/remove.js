function remove(node) {
    var args = isArray(node) ? node : arguments;
    for (var cx = 0, dx = args.length; cx < dx; cx++) {
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
        event = document.createEvent("Event");
        event.initEvent("remove", false, false);
    }
    node.dispatchEvent(event);
    if (isArray(onremove)) {
        onremove.map(function (remove_hindler) {
            remove_hindler.call(this, event);
        }, node);
    }
    if (isFunction(onremove)) {
        onremove.call(node, event);
    }
    var children = node.children;
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        _onremove(children[cx], event);
    }
}