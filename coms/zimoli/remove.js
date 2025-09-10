function remove(node, transition) {
    if (!node) return;
    var args = getArgsChildren(arguments, 0);
    for (var cx = args.length - 1; cx >= 0; cx--) {
        node = args[cx];
        if (!node) continue;
        if (node.removeTimer) clearTimeout(node.removeTimer);
        delete node.removeTimer;
        if (hasLeaveStyle(node) && transition !== false && isFunction(remove.transition)) {
            var duration = remove.transition(node, true);
            if (duration) {
                node.removeTimer = setTimeout(function (node) {
                    return function () {
                        delete node.removeTimer;
                        remove(node, false);
                    };
                }(node), +duration || 100);
                _onremove(node);
            } else {
                remove(node, false);
            }
        } else {
            if (!node.removeTimer) _onremove(node);
            node.parentNode && node.parentNode.removeChild(node);
            if (node.with) {
                remove(node.with, transition);
            }
            dispatch(node, createEvent('removed'));
        }
    }
}

function hasLeaveStyle(o) {
    return o.leavingStyle || o.leaveStyle || o.initialStyle || o.enterSytle;
}

function _onremove(node, event) {
    if (!node || $mounted.get(node) === false) return;
    var children = node.childNodes;
    if ($mounted.get(node)) {
        if (!event) {
            event = createEvent("remove");
        }
        dispatch(node, event);
        $mounted.set(node, false);
    }
    if (children) for (var cx = 0, dx = children.length; cx < dx; cx++) {
        _onremove(children[cx], event);
    }
}