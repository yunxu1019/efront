function isMounted(parent) {
    if ("isMounted" in parent) return parent.isMounted;
    var temp = parent;
    while (temp && temp !== document.documentElement) {
        if ("isMounted" in temp) {
            return parent.isMounted = temp.isMounted;
        }
        temp = temp.parentNode;
    }
    return !!temp;
}