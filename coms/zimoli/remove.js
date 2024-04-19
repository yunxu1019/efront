function remove() {
    var [node, transition] = arguments;
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
        if (hasLeaveStyle(node) && transition !== false && isFunction(remove.transition)) {
            var duration = remove.transition(node, true);
            if (duration) {
                node.removeTimer = setTimeout(function (node) {
                    return function () {
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
    if (!node || node.$mounted === false) return;
    var children = node.childNodes;
    if (node.$mounted) {
        if (!event) {
            event = createEvent("remove");
        }
        dispatch(node, event);
        node.$mounted = false;
    }
    if (children) for (var cx = 0, dx = children.length; cx < dx; cx++) {
        _onremove(children[cx], event);
    }
}