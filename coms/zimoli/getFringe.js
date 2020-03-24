function getFringe(rect, point) {
    if (!rect || !(point instanceof Object)) return false;
    if (isElement(rect)) rect = getScreenPosition(rect);
    var x, y;
    var clientX = "clientX", clientY = "clientY";
    if (clientX in point && clientY in point) {
        x = point.clientX; y = point.clientY;
    } else if (point.length >= 0) {
        x = point[0]; y = point[1];
        clientX = 0;
        clientY = 1;
    } else if ("x" in point && "y" in point) {
        x = point.x; y = point.y;
        clientX = "x";
        clientY = "y";
    } else if ("X" in point && "Y" in point) {
        x = point.X; y = point.Y;
        clientX = "X";
        clientY = "Y";
    }
    var cursor = "", direction = "", delta = 7;
    var { left, top, right, bottom } = rect;
    var resize = new Array(4);
    var resizers_top = ["top", clientY, "height"];
    var resizers_bottom = ["height", clientY];
    var resizers_left = ["left", clientX, "width"];
    var resizers_right = ["width", clientX];

    if (y < top) {
        if (top - y < delta) {
            direction += "n";
            resize.push(resizers_top);
        }
    } else if (y > bottom) {
        if (y - bottom < delta) {
            direction += "s";
            resize.push(resizers_bottom);
        }
    } else {
        var y_top = y - top;
        var y_bottom = bottom - y;
        if (y_top < y_bottom && y_top < delta) {
            direction += "n";
            resize.push(resizers_top);
        } else if (y_top > y_bottom && y_bottom < delta) {
            direction += "s";
            resize.push(resizers_bottom);
        }
    }

    if (x < left) {
        if (left - x < delta) direction += "w";
        resize.push(resizers_left);
    } else if (x > right) {
        if (x - right < delta) direction += "e";
        resize.push(resizers_right);
    } else {
        var x_left = x - left;
        var x_right = right - x;
        if (x_left < x_right && x_left < delta) {
            direction += "w";
            resize.push(resizers_left);
        } else if (x_left > x_right && x_right < delta) {
            direction += "e";
            resize.push(resizers_right);
        }
    }
    if (direction) {
        cursor = direction + "-resize";
    } else {
        resize.push(["left", clientX], ["top", clientY]);
    }
    return { cursor, resize };
}