function extendTouchEvent(e) {
    var touch = e.touches[0];
    for (var k in touch) {
        if (!(k in e)) e[k] = touch[k];
    }
    return e;
}