var slice = [].slice;
var { appendChild: _appendChild, insertBefore: _insertBefore } = document.createElement('a');
function release(node) {
    if (node === null || node === undefined) return node;
    return isFunction(node) ? node() : isNode(node) ? node : document.createTextNode(node);
}

function _onappend(node, event) {
    if (node.isMounted) return;
    if (node.nodeType === 1 || node.nodeType === 8) node.isMounted = true;
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
    var children = [].concat.apply([], node.childNodes);
    if (children) for (var cx = 0, dx = children.length; cx < dx; cx++) {
        _onappend(children[cx], event);
    }
}
_onappend(document.documentElement);

function appendChild(parent, obj, transition) {
    if (transition === false) {
        var children = [].concat(obj);
    } else {
        var children = isArray(obj) ? slice.call(obj, 0) : slice.call(arguments, 1);
    }
    if (parent.appendChild) {
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var o = release(children[cx]);
            if (!o) continue;
            if (o.removeTimer) clearTimeout(o.removeTimer);
            if (o.initialStyle && transition !== false) {
                isFunction(appendChild.transition) && appendChild.transition(o, o.initialStyle);
            }
            _appendChild.call(parent, o);
            o.with && appendChild(parent, o.with, false);
            if (parent.isMounted)
                _onappend(o);
        }
    }
    return parent;
}
function insertBefore(alreadyMounted, obj, transition) {
    var parent = alreadyMounted && alreadyMounted.parentNode;
    if (!parent || !parent.insertBefore) return;
    if (transition === false) {
        var children = [].concat(obj);
    } else {
        var children = isArray(obj) ? slice.call(obj, 0) : slice.call(arguments, 1);
    }
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        var o = release(children[cx]);
        if (o.removeTimer) clearTimeout(o.removeTimer);
        _insertBefore.call(parent, o, alreadyMounted);
        o.with && insertBefore(alreadyMounted, o.with, false);
        if (parent.isMounted)
            _onappend(o);
        if (o.initialStyle && transition !== false) {
            isFunction(appendChild.transition) && appendChild.transition(o, o.initialStyle);
        }
    }
}
function insertAfter(alreadyMounted, obj, transition) {
    var parent = alreadyMounted && alreadyMounted.parentNode;
    if (!parent || !parent.insertBefore) return;
    if (transition === false) {
        var children = [].concat(obj);
    } else {
        var children = isArray(obj) ? slice.call(obj, 0) : slice.call(arguments, 1);
    }
    children = children.reverse();
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        var o = release(children[cx]);
        if (o.removeTimer) clearTimeout(o.removeTimer);
        _insertBefore.call(parent, o, alreadyMounted.nextSibling);
        o.with && insertBefore(alreadyMounted.nextSibling, o.with, false);
        if (parent.isMounted)
            _onappend(o);
        if (o.initialStyle && transition !== false) {
            isFunction(appendChild.transition) && appendChild.transition(o, o.initialStyle);
        }
    }
}

appendChild.before = insertBefore;
appendChild.after = insertAfter;