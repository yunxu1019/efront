var grids = [];

function grid(breakpoints) {
    var grid = div();
    extend(grid, grid_prototype);
    if (!breakpoints) {
        var breakpoints = createPoints([0, [0, 100, 200], 90, 230, [0, 200, [230, 290], 300], 320]);
        breakpoints.value = 0;
        breakpoints.direction = "y";
        breakpoints = breakpoints;
    }
    grid.breakpoints = breakpoints;
    grid.setAttribute("grid", "");
    var cancelmove;
    var adaptCursor = function (event) {
        var position = getScreenPosition(grid);
        var clientX = event.clientX - position.left;
        var clientY = event.clientY - position.top;
        var [x1, y1, x2, y2] = grid.nearby(clientX, clientY);
        var direction = "";
        if (clientY - y1 < 7) {
            direction += "n";
        } else if (y2 - clientY < 7) {
            direction += "s";
        }
        if (clientX - x1 < 7) {
            direction += "w";
        } else if (x2 - clientX < 7) {
            direction += "e";
        }
        grid.direction = direction;
        if (direction) {
            css("[grid]", "cursor:" + direction + "-resize");
        } else {
            css("[grid]", "cursor:default;");
        }
    };
    var resizeInfo = null;
    var resizeView = function (event) {
    };
    onappend(grid, function () {
        grid.init();
        cancelmove && cancelmove();
        cancelmove = onmousemove(window, function (event) {
            if (grid.editting) {
                resizeView(event);
            } else {
                adaptCursor(event);
            }
        });
    });
    onremove(grid, function () {
        cancelmove();
        cancelmove = null;
    });
    onmousedown(grid, function (event) {
        if (grid.direction) {
            var position = getScreenPosition(grid);
            var clientX = event.clientX - position.left;
            var clientY = event.clientY - position.top;
            var [x1, y1, x2, y2] = grid.nearby(clientX, clientY);
            var direction = "";
            if (clientY - y1 < 7) {
                direction += "n";
            } else if (y2 - clientY < 7) {
                direction += "s";
            }
            if (clientX - x1 < 7) {
                direction += "w";
            } else if (x2 - clientX < 7) {
                direction += "e";
            }
            grid.direction = direction;
            if (direction) {
                css("[grid]", "cursor:" + direction + "-resize");
            } else {
                css("[grid]", "cursor:default;");
            }
            grid.editting = { startX: event.clientX };
        }
        var cancelup = onmouseup(window, function () {
            grid.editting = false;
            cancelup();
        });
    });
    return grid;
}
var Point = function (value) {
    var point = [];
    point.value = value;
    return point;
};
var createPoints = function (values, direction = "x", result = Point(0)) {
    if (!values instanceof Array) values = arguments;
    for (var cx = 0, dx = values.length; cx < dx; cx++) {
        var value = values[cx];
        if (value instanceof Array) {
            if (!result.length) throw new Error("数据转换为grid失败！");
            createPoints(value, direction === "x" ? "y" : "x", result[result.length - 1]);
        } else {
            var breakpoint = Point(value);
            breakpoint.direction = direction;
            breakpoint.parent = result;
            result.push(breakpoint);
        }
    }
    return result;
}
var grid_prototype = {
    breakpoints: [],
    init() {
        var that = this;
        var current_l, current_t, current_w, current_h, current_d = this.breakpoints.direction, current_r = that.offsetWidth, current_b = that.offsetHeight;
        var append = function (point, index, points) {
            var next_point = points ? points[index + 1] : null;
            if (point.length) {
                var temp_l = current_l, temp_t = current_t, temp_w = current_w, temp_h = current_h, temp_d = current_d, temp_r = current_r, temp_b = current_b;
                if (current_d === "x") {
                    current_d = "y";
                    current_l = point.value + "px";
                    if (next_point) {
                        current_w = next_point.value - point.value + "px";
                        current_r = next_point.value;
                    } else {
                        current_w = current_r - point.value + "px";
                    }
                } else {
                    current_d = "x";
                    current_t = point.value + "px";
                    if (next_point) {
                        current_h = next_point.value - point.value + "px";
                        current_b = next_point.value;
                    } else {
                        current_h = current_b - point.value + "px";
                    }
                }
                point.map(append);
                current_l = temp_l, current_t = temp_t, current_w = temp_w, current_h = temp_h, current_d = temp_d, current_r = temp_r, current_b = temp_b;
            } else {
                var _div = div();
                var current_value;
                if (current_d === "x") {
                    if (next_point) {
                        current_value = next_point.value - point.value;
                    } else {
                        current_value = current_r - point.value;
                    }
                    css(_div, {
                        left: point.value + "px",
                        top: current_t || 0,
                        width: current_value + "px",
                        height: current_h || 0
                    });
                } else {
                    if (next_point) {
                        current_value = next_point.value - point.value;
                    } else {
                        current_value = current_b - point.value;
                    }
                    css(_div, {
                        left: current_l || 0,
                        top: point.value + "px",
                        width: current_w || 0,
                        height: current_value + "px"
                    });
                }
                appendChild(that, _div);
                point.target = _div;
            }
        };
        append(this.breakpoints);
    },
    seprate(x) {
        saveToOrderedArray(this.breakpoints, Point(x));
    },
    nearby(x, y) {
        var breakpoints = this.breakpoints;
        var breakpath = [];
        var maxXStart = Point(0), maxYStart = Point(0);
        var minXEnd = Point(this.offsetWidth);
        var minYEnd = Point(this.offsetHeight);
        var isX = true;
        do {
            var value = isX ? x : y;// 先 y 后 x
            var index = getIndexFromOrderedArray(breakpoints, value);
            if (isX) {
                maxXStart = breakpoints[index]
                minXEnd = breakpoints[index + 1] || minXEnd;
            } else {
                maxYStart = breakpoints[index];
                minYEnd = breakpoints[index + 1] || minYEnd;
            }
            breakpoints = breakpoints[index];
            breakpath.push(breakpoints);
            isX = !isX;
        } while (breakpoints.length);
        var area = [maxXStart.value, maxYStart.value, minXEnd.value, minYEnd.value];
        area.l = area.left = maxXStart;
        area.t = area.top = maxYStart;
        area.b = area.bottom = minYEnd;
        area.r = area.right = minXEnd;
        area.w = area.width = minXEnd.value - maxXStart.value;
        area.h = area.height = minYEnd.value - maxYStart.value;
        area.p = area.path = breakpath;
        area.d = area.direction = isX ? "x" : "y";
        return area;
    },
};