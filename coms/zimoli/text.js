function text(node, text) {
    if (arguments.length === 2) {
        node.innerHTML = "";
        isFunction(text) && (text = text());
        isFunction(node.setText) ? node.setText(text) : node.appendChild(document.createTextNode(text));
    }
    return isFunction(node.getText) ? node.getText() : node.innerText;
}