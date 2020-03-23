var grids = [];

var getFirstPoints = function (point, side, direction) {
    while (point && point.parent && point.parent.parent && point.parent.parent.value === point.value) {
        point = point.parent.parent;
    }
    var result = [];
    var rest = [point];
    var collect = function (a) {
        if (a.length > 1 && a[0].value === point.value) {
            rest.push(a[0]);
        }
    };
    while (rest.length) {
        var temp = rest.shift();
        result.push(temp);
        temp.forEach(collect);
    }
    return result;
};
var getLastPoints = function (point, side, direction) {
    while (point && point.parent && point.parent.parent && point.parent.parent[side] && point.parent.parent[side].value === point[side].value) {
        point = point.parent.parent;
    }
    var rest = [point];
    var result = [];
    var collect = function (a) {
        var t = a[a.length - 1];
        if (a.length > 1 && t[side] && t[side].value === point[side].value) {
            rest.push(a[a.length - 1]);
        }
    };
    while (rest.length) {
        var temp = rest.shift();
        result.push(temp);
        temp.forEach(collect);
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
    var grid = this;
    var point_prev = point_next[top];
    if (!point_prev) return;
    var nextPoints = getFirstPoints(point_next.direction !== y ? point_next.parent : point_next, bottom, top);
    var prevPoints = getLastPoints(point_prev.direction !== y ? point_prev.parent : point_prev, bottom);
    var clientY = "client" + y.toUpperCase();
    var clientHeight = 'client' + height[0].toUpperCase() + height.slice(1);
    var minValue = Math.max.apply(Math, prevPoints.map(p => p.value || 0)) + 20 / grid[clientHeight] * grid[height];
    var maxValue = Math.min.apply(Math, nextPoints.map(p => (p[bottom] ? p[bottom].value : grid[height]) - 20 / grid[clientHeight] * grid[height]));
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
        top, minValue, maxValue, event[clientY] / grid[clientHeight] * grid[height] - point_next.value,
        height,
        clientHeight
    ];

};

var gridListener = function () {
    var grid = this;
    /**
     * 适配指针
     * @param {Event} event 
     */
    var adaptCursor = function (event) {
        var position = getScreenPosition(grid);
        var clientX = event.clientX - position.left;
        var clientY = event.clientY - position.top;
        clientX = clientX / grid.clientWidth * grid.width;
        clientY = clientY / grid.clientHeight * grid.height;
        var deltax = 7 / grid.clientWidth * grid.width;
        var deltay = 7 / grid.clientHeight * grid.height;
        var [x1, y1, x2, y2] = grid.nearby(clientX, clientY);
        var direction = "";
        if (clientY - y1 < deltay) {
            direction += "n";
        } else if (y2 - clientY < deltay) {
            direction += "s";
        }
        if (clientX - x1 < deltax) {
            direction += "w";
        } else if (x2 - clientX < deltax) {
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
        var runNext = function ({ style }) {
            if (extra) {
                var origin = parseFloat(style[key]);
                style[extra] = parseFloat(style[extra]) + origin - value / grid[extra] * 100 + "%";
            }

            style[key] = value / grid[extra] * 100 + "%";
        };
        var runPrev = function ({ style }) {
            var origin = parseFloat(style[key]) + parseFloat(style[extra]);
            style[extra] = parseFloat(style[extra]) - origin + value / grid[extra] * 100 + "%";
        };
        var runPoints = p => p.value = value;
        for (var k in editting) {
            var [points, prevElements, nextElements, key, min, max, delta, extra, client] = editting[k];
            var value = event[k] / grid[client] * grid[extra] - delta;
            if (value < min) value = min;
            if (value > max) value = max;
            points.forEach(runPoints);
            nextElements.forEach(runNext);
            if (prevElements) {
                prevElements.forEach(runPrev);
            }

        }
    };
    var offmousemove;
    offmousemove = onmousemove(window, function (event) {
        if (!grid.editable) return;
        if (grid.editting) {
            resizeView(event);
        } else {
            adaptCursor(event);
        }
    });
    /**
     * 指针按下
     */
    var offmousedown = onmousedown(grid, function (event) {
        if (!grid.direction) return;
        //调整大小
        var position = getScreenPosition(grid);
        var clientX = event.clientX - position.left;
        var clientY = event.clientY - position.top;
        clientX = clientX / grid.clientWidth * grid.width;
        clientY = clientY / grid.clientHeight * grid.height;
        var deltax = 7 / grid.clientWidth * grid.width;
        var deltay = 7 / grid.clientHeight * grid.height;

        var area = grid.nearby(clientX, clientY);
        var [x_left, y_top, x_right, y_bottom] = area;
        var resize = {};
        if (clientY - y_top < deltay) {
            //上边
            generateResizeParameters.call(grid, "y", "top", "bottom", "height", area.top, event, resize);
        } else if (y_bottom - clientY < deltay) {
            //下边
            generateResizeParameters.call(grid, "y", "top", "bottom", 'height', area.bottom, event, resize);
        }
        if (clientX - x_left < deltax) {
            //左边
            generateResizeParameters.call(grid, "x", "left", "right", "width", area.left, event, resize);
        } else if (x_right - clientX < deltax) {
            //右边
            generateResizeParameters.call(grid, "x", "left", "right", "width", area.right, event, resize);
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

    var offremove = onremove(grid, function () {
        offremove();
        offmousemove();
        offmousedown();
        offmousemove = null;
    });
};

function grid(breakpoints) {
    var grid = this || div();
    if (!grid.size) {
        grid.size = 100;
    }
    if (!grid.width) {
        grid.width = grid.size;
    }
    if (!grid.height) {
        grid.height = grid.size;
    }
    extend(grid, grid_prototype);
    grid.setData(breakpoints);
    grid.reshape();
    grid.setAttribute("grid", "");
    /**
     * 监听指针移动
     */
    once("append")(grid, gridListener);
    return grid;
}
var Point = function (value) {
    var point = [];
    point.value = value instanceof Object ? value.value : value;
    return point;
};
var createPoints = function (values, direction = "x", result = Point(0)) {
    if (!(values instanceof Array)) values = arguments;
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
};
var bindToOrderedSpliters = function (split_points, target, value, side) {
    if (value instanceof Object) {
        value = value.value;
    }
    var index = getIndexFromOrderedArray(split_points, value);
    var data = {
        target, side
    };
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
    setGrid(breakpoints) {
        var grid = this;
        if (!breakpoints) {
            var breakpoints = createPoints([0, [0, 50, [0, 33.3333, 66.6667]]]);
        } else {
            breakpoints = createPoints(breakpoints);
        }
        this.forEachCell(e => remove(e.target));
        grid.breakpoints = breakpoints;
    },
    setData(breakpoints) {
        this.setGrid(breakpoints);
    },
    getData() {
        var run = function (points) {
            if (!points) return;
            if (points instanceof Array) {
                var children = points.map(run);
            }
            var res = {
                value: points.value,
                children
            };
            return res;
        };
        run(this.breakpoints);
    },
    forEachCell(call) {
        var run = function (points) {
            if (!points) return;
            if (points instanceof Array) {
                points.forEach(run);
            }
            if (points.target) {
                call(points);
            }
        };
        run(this.breakpoints);
    },
    reshape() {
        var that = this;
        var current_l, current_t, current_w, current_h, current_d = this.breakpoints.direction, current_r = Point(that.width), current_b = Point(that.height);
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
                        current_w = (next_point.value - point.value);
                        next_point.left = point;
                        point.right = next_point;
                        current_r = next_point;
                    } else {
                        current_w = (current_r.value - point.value);
                    }
                    point[0].top = current_t && current_t.top;
                } else {
                    current_d = "x";
                    current_t = point;
                    if (next_point) {
                        current_h = (next_point.value - point.value);
                        current_b = next_point;
                        next_point.top = point;
                        point.bottom = next_point;
                    } else {
                        current_h = (current_b.value - point.value);
                    }
                    point[0].left = current_l && current_l.left;
                }
                point.map(append);
                current_l = temp_l;
                current_t = temp_t;
                current_w = temp_w;
                current_h = temp_h;
                current_d = temp_d;
                current_r = temp_r;
                current_b = temp_b;
            } else {
                var _div = point.target;
                if (!_div) {
                    point.target = _div = document.createElement('cell');
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
                        left: point.value / that.width * 100 + "%",
                        top: current_t ? current_t.value / that.height * 100 + "%" : 0,
                        width: current_value / that.width * 100 + "%",
                        height: (current_h / that.height || 0) * 100 + "%"
                    });
                    point.width = current_value / that.width;
                    point.height = current_h / that.height;
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
                        left: current_l ? current_l.value / that.width * 100 + "%" : 0,
                        top: point.value / that.height * 100 + "%",
                        width: (current_w / that.width || 0) * 100 + "%",
                        height: current_value / that.height * 100 + "%"
                    });
                    point.width = current_w / that.width;
                    point.height = current_value / that.height;
                }
                appendChild(that, _div);
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
        var minXEnd = Point(this.width);
        var minYEnd = Point(this.height);
        var isX = true;
        do {
            var value = isX ? x : y;// 先 y 后 x
            var index = getIndexFromOrderedArray(breakpoints, value);
            if (isX) {
                maxXStart = breakpoints[index] || maxXStart;
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

function main(elem) {
    if (isElement(elem)) {
        elem = grid.call(elem);
        care(elem, function (points) {
            elem.setData(points);
            elem.reshape();
        });
    } else {
        elem = grid.call(document.createElement('grid'), elem);
    }
    on('click')(elem, function (event) {
        var target = getTargetIn(elem, event.target, false);
        this.forEachCell(a => {
            if (a.target === target) {
                active(this, a.value, a);
            }
        });
    });
    return elem;
}