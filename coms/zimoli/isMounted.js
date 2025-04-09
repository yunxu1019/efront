function isMounted(parent) {
    var m = $mounted.get(parent);
    if (m !== undefined) return m;
    var temp = parent;
    while (temp && temp !== document.documentElement) {
        if ($mounted.has(temp)) {
            var m = $mounted.get(temp);
            $mounted.set(parent, m);
            return m;
        }
        temp = temp.parentNode;
    }
    return !!temp;
}