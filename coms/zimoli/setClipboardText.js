function setClipboardText(text) {
    var span = document.createElement('span');
    setOpacity(span, 0);
    css(span, "position:absolute;top:-1000000px;left:-1000000px;")
    span.innerHTML = text;
    document.body.appendChild(span);
    document.getSelection().setBaseAndExtent(span, 0, span, 1);
    return document.execCommand('copy');
}