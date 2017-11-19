function isElement(o) {
    return !!(isNode(o) && o.children);
}