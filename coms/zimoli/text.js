function text(node, text) {
    if (arguments.length >= 2) {
        if (isFunction(text)) text = text();
        if (isFunction(node.setText)) {
            node.setText(text)
        }
        else {
            node.innerHTML = "";
            node.appendChild(document.createTextNode(text));
        }
    }
    return isFunction(node.getText) ? node.getText() : node.innerText;
}