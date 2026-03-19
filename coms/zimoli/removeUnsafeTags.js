function removeJavascript(a, attr) {
    if (!a.hasAttribute(attr)) return;
    var value = a.getAttribute(attr);
    if (/^javascript\:/i.test(value)) a.removeAttribute(attr);
}
function removeTags(a, tagName) {
    var scripts = a.getElementsByTagName(tagName);
    remove(scripts);
}
function removeUnsafeTags(a) {
    removeTags(a, 'script');
    removeTags(a, 'iframe');
    removeTags(a, 'style');
    removeTags(a, 'meta');
    if (a.hasAttribute('onload')) a.removeAttribute('onload');
    if (a.hasAttribute('onerror')) a.removeAttribute('onerror');
    removeJavascript(a, 'src');
    removeJavascript(a, 'href');
    for (var c of a.children) removeUnsafeTags(c);
    return a;
}