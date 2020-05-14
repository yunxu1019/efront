function isMounted(parent) {
    if ("isMounted" in parent) return parent.isMounted;
    var temp = parent;
    while (temp && temp !== document.documentElement) {
        temp = temp.parentNode;
    }
    return parent.isMounted = !!temp;
}