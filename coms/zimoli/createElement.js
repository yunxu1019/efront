/* 
 * 不枝雀
 * 2017-3-18 0:28:10
 */

var slice = [].slice;
var prototype = {
    addClass(clazz) {
        addClass(this, clazz);
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
    insertBefore(child, referer) {
        if (referer) {
            if (referer.parentNode !== this) throw new Error('The node before which the new node is to be inserted is not a child of this node');
            appendChild.before(referer, child, false);
        } else {
            appendChild(this, child, false);
        }
        return child;
    },
    appendChild(child) {
        appendChild(this, child, false);
        return child;
    },
    appendTo(target) {
        appendChild(target, this);
        return this;
    },
    remove() {
        remove(this);
        return this;
    },
    empty() {
        remove(this.childNodes);
        return this;
    },
    click(action) {
        if (isFunction(action)) {
            onclick(this, action);
        } else {
            dispatch(this, "click");
        }
        return this;
    },
    render(scope) {
        render(this, scope);
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