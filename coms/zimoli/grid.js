var grids = [];

function grid(breakpoints) {
    var grid = div();
    extend(grid, grid_prototype);
    if (!breakpoints) {
        var breakpoints = createPoints([0, [0, 100, 200], 90, 230, [200, [230, 290], 300], 320]);
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
        var editting = grid.editting;
        var { area, target, resize } = editting;
        if (!target) return;
        var style = target.style;
        for (var k in resize) {
            var [key, min, max, delta, extra] = resize[k];
            var value = event[k] - delta;
            if (value < min) value = min;
            if (value > max) value = max;
            var origin = parseInt(style[key]);
            style[key] = value + "px";
            if (extra)
                style[extra] = parseInt(style[extra]) + origin - value + "px";
        }
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
            var area = grid.nearby(clientX, clientY);
            var [x_left, y_top, x_right, y_bottom] = area;
            var resize = {};
            var path = area.path;
            var target_point = path[path.length - 1];
            var target_element = target_point.target;
            var style = target_element.style;
            if (clientY - y_top < 7) {
                var top = area.top;
                if (top.parent) {
                    var parent = top.parent;
                    var index = getIndexFromOrderedArray(parent, clientY);
                    var point = parent[0].value > 0 ? parent[index - 2] || Point(0) : parent[index - 2] || null;
                    if (point) {
                        resize.clientY = [
                            "top", point.value + 20, area.bottom.value - 20, event.clientY - parseInt(style.top),
                            "height"
                        ];
                    }
                }
            } else if (y_bottom - clientY < 7) {
                var bottom = area.bottom;
                if (bottom.parent) {
                    var parent = bottom.parent;
                    var index = getIndexFromOrderedArray(parent, clientY);
                    var offsetHeight = grid.offsetHeight;
                    var point = parent[parent.length - 1].value < offsetHeight ? parent[index + 1] || Point(offsetHeight) : parent[index + 1] || null;
                    if (point) {
                        resize.clientY = ["height", 20, point.value - area.top.value - 20, event.clientY - parseInt(style.height)];
                    }
                }
            }
            if (clientX - x_left < 7) {
                var left = area.left;
                if (left.parent) {
                    var parent = left.parent;
                    var index = getIndexFromOrderedArray(parent, clientX);
                    var offsetWidth = grid.offsetWidth;
                    var point = parent[0].value > 0 ? parent[index - 2] || Point(offsetWidth) : parent[index - 2] || null;
                    if (point) {
                        resize.clientX = ["left", point.value + 20, area.right.value - 20, event.clientX - parseInt(style.left), "width"];
                    }
                }
            } else if (x_right - clientX < 7) {
                var right = area.right;
                if (right.parent) {
                    var parent = right.parent;
                    var index = getIndexFromOrderedArray(parent, clientX);
                    var offsetWidth = grid.offsetWidth;
                    var point = parent[0].value > 0 ? parent[index + 1] || Point(offsetWidth) : parent[index + 1] || null;
                    if (point) {
                        resize.clientX = ["width", 20, point.value - area.left.value - 20, event.clientX - parseInt(style.width)];
                    }
                }
            }
            grid.editting = { area, target: target_element, resize };
            style.zIndex = 1;
        }
        var cancelup = onmouseup(window, function () {
            var target = grid.editting.target;
            if (target) target.style.zIndex = null;
            grid.editting = null;
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
var bindToOrderedSpliters = function (split_points, target, value, side) {
    if (value instanceof Object) {
        value = value.value;
    }
    var index = getIndexFromOrderedArray(split_points, value);
    var data = {
        target, side
    }
    var point = split_points[index];
    console.log(index, point, value, point && point.value === value)
    if (point && point.value === value) {
        point.push(data);
    } else {
        point = [data];
        point.value = value;
        saveToOrderedArray(split_points, point);
    }
    return split_points;
}
var grid_prototype = {
    breakpoints: [],
    init() {
        var that = this;
        var current_l, current_t, current_w, current_h, current_d = this.breakpoints.direction, current_r = Point(that.offsetWidth), current_b = Point(that.offsetHeight);
        var xPoints = [];
        var yPoints = [];
        var append = function (point, index, points) {
            var next_point = points ? points[index + 1] : null;
            if (point.length) {
                var temp_l = current_l, temp_t = current_t, temp_w = current_w, temp_h = current_h, temp_d = current_d, temp_r = current_r, temp_b = current_b;
                if (current_d === "x") {
                    current_d = "y";
                    current_l = point;
                    if (next_point) {
                        current_w = next_point.value - point.value + "px";
                        current_r = next_point;
                    } else {
                        current_w = current_r.value - point.value + "px";
                    }
                } else {
                    current_d = "x";
                    current_t = point;
                    if (next_point) {
                        current_h = next_point.value - point.value + "px";
                        current_b = next_point;
                    } else {
                        current_h = current_b.value - point.value + "px";
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
                        current_value = current_r.value - point.value;
                    }
                    bindToOrderedSpliters(xPoints,
                        _div,
                        point.value + current_value,
                        "right"
                    );
                    bindToOrderedSpliters(xPoints,
                        _div,
                        point.value,
                        "left"
                    );
                    bindToOrderedSpliters(yPoints,
                        _div,
                        current_t && current_t.value || 0,
                        "top"
                    );
                    bindToOrderedSpliters(yPoints,
                        _div,
                        current_b,
                        "bottom"
                    );
                    css(_div, {
                        left: point.value + "px",
                        top: current_t ? current_t.value + "px" : 0,
                        width: current_value + "px",
                        height: current_h || 0
                    });
                } else {
                    if (next_point) {
                        current_value = next_point.value - point.value;
                    } else {
                        current_value = current_b.value - point.value;
                    }
                    bindToOrderedSpliters(xPoints,
                        _div,
                        current_r,
                        "right"
                    );
                    bindToOrderedSpliters(xPoints,
                        _div,
                        current_l && current_l.value || 0,
                        "left"
                    );
                    bindToOrderedSpliters(yPoints,
                        _div,
                        point.value,
                        "top"
                    );
                    bindToOrderedSpliters(yPoints,
                        _div,
                        point.value + current_value,
                        "bottom"
                    );
                    css(_div, {
                        left: current_l ? current_l.value + "px" : 0,
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
        this.xPoints = xPoints;
        this.yPoints = yPoints;
        window.grid = this;
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
                maxXStart = breakpoints[index] || maxXStart
                minXEnd = breakpoints[index + 1] || minXEnd;
            } else {
                maxYStart = breakpoints[index] || maxYStart;
                minYEnd = breakpoints[index + 1] || minYEnd;
            }
            breakpoints = breakpoints[index] || [];
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