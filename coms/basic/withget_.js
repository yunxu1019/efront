function withget_(k, objlist, v) {
    for (var o of objlist) {
        if (k in o) return o[k];
    }
    return v;
}