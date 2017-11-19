function text(node, text) {
    if (arguments.length === 2) {
        if (isString(node)) {
            var _node = div();
            appendChild(_node, document.createTextNode(node));
            css(_node, text);
            return _node;
        }
        node.innerHTML = "";
        isFunction(text) && (text = text());
        isFunction(node.text) ? node.text(text) : node.appendChild(document.createTextNode(text));
    }
    return node.innerHTML;
}