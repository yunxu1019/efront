var grids = [];

var getFirstPoints = function (point, side, direction) {
    while (point && point.parent && point.parent.parent && point.parent.parent.value === point.value) {
        point = point.parent.parent;
    }
    var result = [];
    var rest = [point];
    while (rest.length) {
        var temp = rest.shift();
        result.push(temp);
        temp.forEach(function (a) {
            if (a.length > 1 && a[0].value === point.value) {
                rest.push(a[0]);
            }
        });
    }
    return result;
};
var getLastPoints = function (point, side, direction) {
    while (point && point.parent && point.parent.parent && point.parent.parent[side] && point.parent.parent[side].value === point[side].value) {
        point = point.parent.parent;
    }
    var rest = [point];
    var result = [];
    while (rest.length) {
        var temp = rest.shift();
        result.push(temp);
        temp.forEach(function (a) {
            var t = a[a.length - 1];
            if (a.length > 1 && t[side] && t[side].value === point[side].value) {
                rest.push(a[a.length - 1]);
            }
        });
    }
    return result;
};
var getElemetsFromPoints = function (points) {
    var elements = points.map(function (a) {
        if (a.target) {
            return a.target;
        } else {
            return a.filter(b => !!b.target).map(a => a.target);
        }
    });
    return [].concat.apply([], elements);
};

var generateResizeParameters = function (y, top, bottom, height, point_next, event, resize) {
    var point_prev = point_next[top];
    if (!point_prev) return;
    var nextPoints = getFirstPoints(point_next.direction !== y ? point_next.parent : point_next, bottom, top);
    var prevPoints = getLastPoints(point_prev.direction !== y ? point_prev.parent : point_prev, bottom);
    var clientY = "client" + y.toUpperCase();
    var minValue = Math.max.apply(Math, prevPoints.map(p => p.value || 0)) + 20;
    var maxValue = Math.min.apply(Math, nextPoints.map(p => p[bottom] ? p[bottom].value - 20 : Infinity));
    var nextElements = getElemetsFromPoints(nextPoints);
    var prevElements = getElemetsFromPoints(prevPoints);
    prevElements.forEach(function (element) {
        addClass(element, "border-" + bottom);
    });
    nextElements.forEach(function (element) {
        addClass(element, "border-" + top);
    });
    resize[clientY] = [
        nextPoints,
        prevElements,
        nextElements,
        top, minValue, maxValue, event[clientY] - point_next.value,
        height
    ];

}

function grid(breakpoints) {
    var grid = div();
    extend(grid, grid_prototype);
    if (!breakpoints) {
        var breakpoints = createPoints([0, [0, 100, 200], 90, 230, [200, 230, [230, 290], 300], 320]);
    }
    grid.breakpoints = breakpoints;
    grid.setAttribute("grid", "");
    /**
     * 适配指针
     * @param {Event} event 
     */
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
    /**
     * 调整大小
     * @param {Event} event 
     */
    var resizeView = function (event) {
        var editting = grid.editting;
        for (var k in editting) {
            var [points, prevElements, nextElements, key, min, max, delta, extra] = editting[k];
            var value = event[k] - delta;
            if (value < min) value = min;
            if (value > max) value = max;
            points.forEach(p => p.value = value);
            nextElements.forEach(function ({ style }) {
                if (extra) {
                    var origin = parseInt(style[key]);
                    style[extra] = parseInt(style[extra]) + origin - value + "px";
                }
                style[key] = value + "px";
            });
            if (prevElements) {
                prevElements.forEach(function ({ style }) {
                    var origin = parseInt(style[key]) + parseInt(style[extra]);
                    style[extra] = parseInt(style[extra]) - origin + value + "px";
                });
            }

        }
    };
    /**
     * 监听指针移动
     */
    var cancelmove;
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
    /**
     * 指针按下
     */
    onmousedown(grid, function (event) {
        if (!grid.direction) return;
        //调整大小
        var position = getScreenPosition(grid);
        var clientX = event.clientX - position.left;
        var clientY = event.clientY - position.top;
        var area = grid.nearby(clientX, clientY);
        var [x_left, y_top, x_right, y_bottom] = area;
        var resize = {};
        if (clientY - y_top < 7) {
            //上边
            generateResizeParameters("y", "top", "bottom", "height", area.top, event, resize);
        } else if (y_bottom - clientY < 7) {
            //下边
            generateResizeParameters("y", "top", "bottom", 'height', area.bottom, event, resize);
        }
        if (clientX - x_left < 7) {
            //左边
            generateResizeParameters("x", "left", "right", "width", area.left, event, resize);
        } else if (x_right - clientX < 7) {
            //右边
            generateResizeParameters("x", "left", "right", "width", area.right, event, resize);
        }
        grid.editting = resize;
        var cancelup = onmouseup(window, function () {
            var target = grid.editting.target;
            if (target) target.style.zIndex = null;
            var { clientX, clientY } = resize;
            resize = null;
            if (clientX) {
                clientX[1].forEach(e => removeClass(e, 'border-right'));
                clientX[2].forEach(e => removeClass(e, 'border-left'));
            }
            if (clientY) {
                clientY[1].forEach(e => removeClass(e, "border-bottom"));
                clientY[2].forEach(e => removeClass(e, "border-top"));
            }
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
    if (point && point.value === value) {
        point.push(data);
    } else {
        point = [data];
        point.value = value;
        saveToOrderedArray(split_points, point);
    }
    return split_points;
};
var grid_prototype = {
    breakpoints: [],
    init() {
        this.reshape();
    },
    reshape() {
        var that = this;
        var current_l, current_t, current_w, current_h, current_d = this.breakpoints.direction, current_r = Point(that.offsetWidth), current_b = Point(that.offsetHeight);
        // var xPoints = [];
        // var yPoints = [];
        var append = function (point, index, points) {
            var next_point = points ? points[index + 1] : null;
            if (point.length) {
                var temp_l = current_l, temp_t = current_t, temp_w = current_w, temp_h = current_h, temp_d = current_d, temp_r = current_r, temp_b = current_b;
                if (current_d === "x") {
                    current_d = "y";
                    current_l = point;
                    if (next_point) {
                        current_w = next_point.value - point.value + "px";
                        next_point.left = point;
                        point.right = next_point;
                        current_r = next_point;
                    } else {
                        current_w = current_r.value - point.value + "px";
                    }
                    point[0].top = current_t && current_t.top;
                } else {
                    current_d = "x";
                    current_t = point;
                    if (next_point) {
                        current_h = next_point.value - point.value + "px";
                        current_b = next_point;
                        next_point.top = point;
                        point.bottom = next_point;
                    } else {
                        current_h = current_b.value - point.value + "px";
                    }
                    point[0].left = current_l && current_l.left;
                }
                point.map(append);
                current_l = temp_l, current_t = temp_t, current_w = temp_w, current_h = temp_h, current_d = temp_d, current_r = temp_r, current_b = temp_b;
            } else {
                var _div = point.target;
                if (!_div) {
                    point.target = _div = div();
                }
                var current_value;
                if (current_d === "x") {
                    if (next_point) {
                        current_value = next_point.value - point.value;
                        point.right = next_point;
                        next_point.left = point;
                    } else {
                        current_value = current_r.value - point.value;
                        point.right = current_r;
                    }
                    point.top = current_t;
                    point.bottom = current_b;
                    css(_div, {
                        left: point.value + "px",
                        top: current_t ? current_t.value + "px" : 0,
                        width: current_value + "px",
                        height: current_h || 0
                    });
                } else {
                    if (next_point) {
                        current_value = next_point.value - point.value;
                        next_point.top = point;
                        point.bottom = next_point;
                    } else {
                        current_value = current_b.value - point.value;
                        point.bottom = current_b;
                    }
                    point.left = current_l;
                    point.right = current_r;
                    css(_div, {
                        left: current_l ? current_l.value + "px" : 0,
                        top: point.value + "px",
                        width: current_w || 0,
                        height: current_value + "px"
                    });
                }
                appendChild(that, _div);
            }
        };
        this.breakpoints[0]
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