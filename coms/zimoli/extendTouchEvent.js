function extendTouchEvent(e) {
    var touch = (e.changedTouches || e.touches)[0];
    for (var k in touch) {
        if (!(k in e)) e[k] = touch[k];
    }
    e.screenX = window.screenLeft + e.clientX;
    e.screenY = window.screenTop + e.clientY;
    return e;
}