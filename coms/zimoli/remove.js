function remove(node, transition) {
    if (!node) return;
    if (isNode(node)) {
        if (transition !== false) {
            var args = arguments;
        } else {
            var args = [node];
        }
    } else {
        var args = node;
    }
    for (var cx = args.length - 1; cx >= 0; cx--) {
        node = args[cx];
        if (!node) continue;
        if (node.removeTimer) clearTimeout(node.removeTimer);
        if (node.initialStyle && transition !== false && isFunction(remove.transition)) {
            var duration = remove.transition(node, node.initialStyle, true);
            if (duration) {
                node.removeTimer = setTimeout(function (node) {
                    return function () {
                        remove(node, false);
                    };
                }(node), +duration || 100);
            } else {
                remove(node, false);
            }
        } else {
            _onremove(node);
            node.parentNode && node.parentNode.removeChild(node);
            if (node.with) {
                remove(node.with, false);
            }
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
    var children = node.childNodes;
    if (children) for (var cx = 0, dx = children.length; cx < dx; cx++) {
        _onremove(children[cx], event);
    }
}