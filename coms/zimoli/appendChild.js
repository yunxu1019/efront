var slice = [].slice;

function release(node) {
    return isFunction(node) ? node() : isNode(node) ? node : document.createTextNode(node);
}

function appendChild(parent, obj) {
    var children = isArray(obj) ? slice.call(obj, 0) : slice.call(arguments, 1);
    if (parent.appendChild)
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            parent.appendChild(release(children[cx]));
        }
    return parent;
}