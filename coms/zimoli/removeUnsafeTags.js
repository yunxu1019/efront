function removeJavascript(a, attr) {
    if (!a.hasAttribute(attr)) return;
    var value = a.getAttribute(attr);
    if (/^javascript\:/i.test(value)) a.removeAttribute(attr);
}
function remoteUnsafeTags(a) {
    var scripts = a.getElementsByTagName("script");
    remove(scripts);
    if (a.hasAttribute('onload')) a.removeAttribute('onload');
    if (a.hasAttribute('onerror')) a.removeAttribute('onerror');
    removeJavascript(a, 'src');
    removeJavascript(a, 'href');
    for (var c of a.children) remoteUnsafeTags(c);
    return a;
}