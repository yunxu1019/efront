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

function _onremove(node) {
    if (!node.isMounted) return;
    var onremove = node.onremove;
    node.isMounted = false;
    if (isArray(onremove)) {
        onremove.map(function (remove_hindler) {
            remove_hindler();
        });
    }
    if (isFunction(onremove)) {
        onremove();
    }
    var childNodes = node.childNodes;
    for (var cx = 0, dx = childNodes.length; cx < dx; cx++) {
        _onremove(childNodes[cx]);
    }
}