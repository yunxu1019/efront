var resizingElements = [];
var getResizer = function (event) {
    if (dragging) return;
    var rect = getTargetIn(a => ~resizingElements.indexOf(a), event.target);
    if (!rect) {
        var temp = getEventRect(event);
        var min, min_area = Infinity;
        resizingElements.forEach(function (elem) {
            var area = overlap(elem, temp);
            if (area < min_area) {
                min = elem;
                min_area = area;
            }
        });
        if (min_area > 0 && min) {
            rect = min;
        }
        if (!rect) {
            css("body", {
                cursor: ""
            });
            return;
        }
    }
    var fringe = getFringe(rect, event);
    if (!event.which) {
        css("body", {
            cursor: fringe.cursor
        });
    }
    var { resize } = fringe;
    extend(resize, getScreenPosition(rect));
    resize.rect = rect;
    resize.cursor = fringe.cursor;
    return resize;
};
var dragging;
var handle = {
    start(event) {
        event.preventDefault();
        event.moveLocked = true;
        dragging = getResizer(event);
        var elem = dragging.rect;
        var pos = getScreenPosition(elem.offsetParent);
        var delta = [event.clientX, event.clientY, event.clientX - pos.left, event.clientY - pos.top];
        if (!dragging) return;
        if (!dragging.cursor) {
            if (!getTargetIn(elem.dragTarget || elem, event.target)) {
                dragging = null;
                return;
            }
        }
        dragging.clientX = delta[0];
        dragging.clientY = delta[1];
        var limit = dragging.cursor ? [pos.left, pos.top, pos.right, pos.bottom] : [
            pos.left + event.clientX - dragging.left,
            pos.top + event.clientY - dragging.top,
            pos.right + event.clientX - dragging.right,
            pos.bottom + event.clientY - dragging.bottom
        ];
        dragging.limit = limit;
        dragging.left -= pos.left;
        dragging.top -= pos.top;
    },
    move(event) {
        event.moveLocked = true;
        if (!dragging) return;
        var limit = dragging.limit;
        var { clientX, clientY } = event;
        var [minx, miny, maxx, maxy] = limit;
        if (clientX < minx) clientX = minx;
        if (clientY < miny) clientY = miny;
        if (clientX > maxx) clientX = maxx;
        if (clientY > maxy) clientY = maxy;
        var style = {};
        dragging.forEach(function (resize) {
            var [key, client, extra] = resize;
            var delta = { clientX, clientY }[client] - dragging[client];
            if (extra) {
                var value = dragging[key] + delta;
                var size = dragging[extra] - delta;
                if (size < 0) {
                    value = value + size;
                    size = -size;
                }
                style[key] = value;
                style[extra] = size;
            } else {
                var size = dragging[key] + delta;
                if (size < 0) {
                    var ext = /^w/i.test(key) ? 'left' : 'top';
                    style[ext] = dragging[ext] + size;
                    size = -size;
                }
                style[key] = size;
            }
        });
        var rect = dragging.rect;
        move.call(rect, isFinite(style.left) ? style.left : rect.offsetLeft, isFinite(style.top) ? style.top : rect.offsetTop);
        delete style.left;
        delete style.top;
        Object.keys(style).forEach(k => style[k] = fromOffset(style[k]));
        css(dragging.rect, style);


    },
    end(e) {
        dragging = null;
    }
};
function resize(elem, initialEvent) {
    moveupon(elem, handle, initialEvent);
}
moveupon(window, handle);

resize.on = function (elem) {
    onmounted(elem, function () {
        var off = onmousemove(window, getResizer);
        onremove(elem, off);
    });
    if (!~resizingElements.indexOf(elem)) {
        resizingElements.push(elem);
        once('remove')(elem, function () {
            var index = resizingElements.indexOf(this);
            if (~index) resizingElements.splice(index, 1);
        });
    }
};