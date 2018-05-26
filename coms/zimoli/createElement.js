/* 
 * 不枝雀
 * 2017-3-18 0:28:10
 */

var slice = [].slice;
var prototype = {
    addClass(clazz) {
        addclass(this, clazz);
        return this;
    },
    removeClass(clazz) {
        removeClass(this, clazz);
        return this;
    },
    append() {
        appendChild(this, [].slice.call(arguments, 0));
        return this;
    },
    appendTo(target) {
        appendChild(target, this);
        return this;
    }
}

function createElement(name) {
    var node = isNode(name) ? name.cloneNode() : isFunction(name) ? name() : document.createElement(name);
    if (name.className) node.className = name.className;
    appendChild(node, slice.call(arguments, 1));
    extend(node, prototype);
    return node;
}