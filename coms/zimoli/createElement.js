/* 
 * 不枝雀
 * 2017-3-18 0:28:10
 */

var slice = [].slice;


function createElement(name) {
    var node = isNode(name) ? name.cloneNode() : isFunction(name) ? name() : document.createElement(name);
    if (name.className) node.className = name.className;
    appendChild(node, slice.call(arguments, 1));
    return node;
}