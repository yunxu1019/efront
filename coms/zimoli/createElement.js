/* 
 * 不枝雀
 * 2017-3-18 0:28:10
 */

var slice = [].slice;

function create(node) {
    return isFunction(node) ? node() : node.cloneNode ? node : document.createElement(node);
}

function createElement(name) {
    var node = name.cloneNode ? name.cloneNode() : create(name);
    appendChild(node, slice.call(arguments, 1).map(create));
    return node;
}