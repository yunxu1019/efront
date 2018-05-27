function text(node, text) {
    if (arguments.length === 2) {
        node.innerHTML = "";
        isFunction(text) && (text = text());
        isFunction(node.text) ? node.text(text) : node.appendChild(document.createTextNode(text));
    }
    return node.innerHTML;
}