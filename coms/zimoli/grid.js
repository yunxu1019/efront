
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

/**
 * 适配指针
 * @param {Event} event 
 */
var adaptCursor = function (event) {
    var grid = this;
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
        if (y1 !== 0) direction += "n";
    } else if (y2 - clientY < deltay) {
        if (y2 !== grid.height) direction += "s";
    }
    if (clientX - x1 < deltax) {
        if (x1 !== 0) direction += "w";
    } else if (x2 - clientX < deltax) {
        if (x2 !== grid.width) direction += "e";
    }
    grid.direction = direction;
    if (direction) {
        css("*", "cursor:" + direction + "-resize");
    } else {
        css("*", "cursor:");
    }
};
/**
 * 调整大小
 * @param {Event} event 
 */
var resizeView = function (event) {
    var grid = this;
    var editting = grid.editting;
    var runPoints = p => p.value = value;
    for (var k in editting) {
        var [points, _, _, _, min, max, delta, extra, client] = editting[k];
        var value = event[k] / grid[client] * grid[extra] - delta;
        if (value < min) value = min;
        if (value > max) value = max;
        points.forEach(runPoints);

    }
    grid.reshape();
};
var resizer = function (event) {
    var grid = this;
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
};
var gridListener = function () {
    var grid = this;
    var offmousemove;
    offmousemove = onmousemove(window, function (event) {
        if (!grid.editable) return;
        event.moveLocked = true;
        if (grid.editting) {
            resizeView.call(grid, event);
        } else {
            adaptCursor.call(grid, event);
        }
    });
    /**
     * 指针按下
     */
    var offmousedown = onmousedown(grid, resizer);

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
            var breakpoints = createPoints([]);
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
    forEachCell(call, thisObj) {
        var run = function (points) {
            if (!points) return;
            if (points instanceof Array) {
                points.forEach(run);
            }
            if (points.target) {
                call.call(thisObj, points);
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
                point.forEach(append);
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
                    if (point.origin !== point.value || current_t && current_t.origin !== current_t.value) {
                        css(_div, {
                            left: point.value / that.width * 100 + "%",
                            top: current_t ? current_t.value / that.height * 100 + "%" : 0,
                            width: current_value / that.width * 100 + "%",
                            height: (current_h / that.height || 0) * 100 + "%"
                        });
                        point.width = current_value / that.width;
                        point.height = current_h / that.height;
                    }
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
                    if (point.origin !== point.value || current_l && current_l.origin !== current_l.value) {
                        css(_div, {
                            left: current_l ? current_l.value / that.width * 100 + "%" : 0,
                            top: point.value / that.height * 100 + "%",
                            width: (current_w / that.width || 0) * 100 + "%",
                            height: current_value / that.height * 100 + "%"
                        });
                        point.width = current_w / that.width;
                        point.height = current_value / that.height;
                    }
                }
                if (_div.parentNode !== that) appendChild(that, _div);
            }
        };
        append(this.breakpoints);
        var store = function (point) {
            if (point.length) {
                point.forEach(store);
            } else {
                point.origin = point.value;
            }
        };
        store(this.breakpoints);
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

var actionemiter = function (event) {
    var target = getTargetIn(this, event.target, false);
    this.forEachCell(a => {
        if (a.target === target) {
            active(this, a.value, a);
        }
    });
};

function main(elem) {
    if (isElement(elem)) {
        elem = grid.call(elem);
        care(elem, elem.setData);
        care(elem, elem.reshape);
    } else {
        elem = grid.call(document.createElement('grid'), elem);
    }
    on('click')(elem, actionemiter);
    return elem;
}