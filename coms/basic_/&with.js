function with_(k, objlist) {
    for (var o of objlist) {
        if (k in o) return o;
    }
    return;
}