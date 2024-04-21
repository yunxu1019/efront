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
            if (referer.parentNode !== this) throw new Error(i18n`父元素不能是当前元素的子元素`);
            appendChild.before(referer, child, false);
        } else {
            appendChild(this, child, false);
        }
        return child;
    },
    appendChild(child) {
        var _appendChild = this.appendChild
        delete this.appendChild;
        appendChild(this, child, false);
        if (_appendChild) this.appendChild = _appendChild;
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
console.error(i18n`createElement将会在未来的版本中移除！`);
function createElement(name) {
    var node = isNode(name) ? name.cloneNode() : isFunction(name) ? name() : document.createElement(name);
    if (name.className) addClass(node, name.className);
    appendChild(node, slice.call(arguments, 1));
    extend(node, prototype);
    return node;
}