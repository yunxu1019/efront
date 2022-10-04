var slice = [].slice;
var { appendChild: _appendChild, insertBefore: _insertBefore } = document.createElement('a');
var isWorseIE = /msie\s+[2-8]/i.test(navigator.userAgent);

function release(node) {
    if (node === null || node === undefined) return node;
    return isFunction(node) ? node() : isNode(node) ? node : document.createTextNode(node);
}

function hasEnterStyle(e) {
    return e.initialStyle || e.enterStyle || e.leavingStyle || e.leaveStyle;
}

function _onappend(node, append = createEvent("append"), mount = createEvent("mounted")) {
    if (node.isMounted) return;
    if (node.nodeType === 1 || node.nodeType === 8) node.isMounted = true;
    dispatch(node, append);
    var children = [...node.childNodes];
    for (var c of children) {
        _onappend(c, append, mount);
    }
    dispatch(node, mount);
}
function appendChild(parent, obj, transition) {
    if (transition === false) {
        var children = [].concat(obj);
    } else {
        var children = isArrayLike(obj) ? slice.call(obj, 0) : slice.call(arguments, 1);
    }
    if (parent.appendChild) {
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var o = release(children[cx]);
            if (!o) continue;
            if (o.removeTimer) clearTimeout(o.removeTimer);
            if (hasEnterStyle(o) && transition !== false) {
                isFunction(appendChild.transition) && appendChild.transition(o);
            }
            if (isWorseIE) {
                try {
                    _appendChild.call(parent, o);
                } catch (e) {
                    console.error("appendChild", parent.tagName, o.tagName);
                }
            } else {
                _appendChild.call(parent, o);
            }
            o.with && appendChild(parent, o.with, transition);
            if (isMounted(parent)) _onappend(o);
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
        if (!o) continue;
        if (o.removeTimer) clearTimeout(o.removeTimer);
        _insertBefore.call(parent, o, alreadyMounted);
        o.with && insertBefore(alreadyMounted, o.with, transition);
        if (isMounted(parent)) _onappend(o);
        if (hasEnterStyle(o) && transition !== false) {
            isFunction(appendChild.transition) && appendChild.transition(o);
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
        o.with && insertBefore(alreadyMounted.nextSibling, o.with, transition);
        if (isMounted(parent)) _onappend(o);
        if (hasEnterStyle(o) && transition !== false) {
            isFunction(appendChild.transition) && appendChild.transition(o);
        }
    }
}

appendChild.before = insertBefore;
appendChild.after = insertAfter;
/**
 * 相当于 insertBefore
 */
appendChild.insert = function (parent, element, relative = parent.childNodes[0] || null) {
    if (!relative) {
        appendChild(parent, element);
    } else {
        insertBefore(relative, element);
    }
};
appendChild.replace = function (alreadyMounted, element) {
    if (alreadyMounted === element) return;
    if (!alreadyMounted || !alreadyMounted.parentNode) return;
    insertBefore(alreadyMounted, element);
    remove(alreadyMounted);
};