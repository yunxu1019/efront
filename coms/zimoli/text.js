function text(node, text) {
    if (isString(node)) {
        var _node = div();
        _node.innerText = node;
        css(_node, text);
        return _node;
    }
    isFunction(text) && (text = text());
    isFunction(node.text) ? node.text(text) : node.innerText = text;
}