function isMounted(parent) {
    if ("$mounted" in parent) return parent.$mounted;
    var temp = parent;
    while (temp && temp !== document.documentElement) {
        if ("$mounted" in temp) {
            return parent.$mounted = temp.$mounted;
        }
        temp = temp.parentNode;
    }
    return !!temp;
}