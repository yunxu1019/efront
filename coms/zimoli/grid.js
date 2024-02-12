"use strict";
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

var generateResizeParameters = function (y, top, bottom, height, point_next, event, b1, resize) {
    var grid = this;
    var bounds = grid.bounds;
    var bound_top = bounds[b1 === 0 ? b1 : b1 + 2];
    var bound_bottom = bounds[b1 === 0 ? b1 + 2 : b1];
    var computed = getComputedStyle(grid);
    var paddingTop = 'padding' + top[0].toUpperCase() + top.slice(1);
    var paddingBottom = 'padding' + bottom[0].toUpperCase() + bottom.slice(1);
    var point_prev = point_next[top];
    if (!point_prev) return;
    var nextPoints = getFirstPoints(point_next.direction !== y ? point_next.parent : point_next, bottom, top);
    var prevPoints = getLastPoints(point_prev.direction !== y ? point_prev.parent : point_prev, bottom);
    var clientY = "client" + y.toUpperCase();
    var clientHeight = 'client' + height[0].toUpperCase() + height.slice(1);
    if (point_next <= bound_top || point_next >= grid[height] - bound_bottom) {
        var ratio = (bound_top + bound_bottom) / (parseFloat(computed[paddingBottom]) + parseFloat(computed[paddingTop]))
    } else {
        var ratio = (grid[height] - bound_top - bound_bottom) / (grid[clientHeight] - parseFloat(computed[paddingTop]) - parseFloat(computed[paddingBottom]));
    }
    var minDelta = 20 / grid[clientHeight] * grid[height];
    var minIndex = b1 === 0 ? 1 : 0;
    var maxIndex = minIndex + 2;
    var minValue1 = Math.max.apply(Math, prevPoints.map(p => (p.value || 0) + (p.range ? Math.max(p.range[minIndex], minDelta) : minDelta)));
    var maxValue1 = Math.min.apply(Math, nextPoints.map(p => (p[bottom] ? p[bottom].value : grid[height]) - (p[bottom] && p[bottom].range ? Math.max(p[bottom].range[minIndex], minDelta) : minDelta)));
    var minValue2 = Math.max.apply(Math, nextPoints.map(p => (p[bottom] ? p[bottom].value : grid[height]) - (p[bottom] && p[bottom].range ? p[bottom].range[maxIndex] : Infinity)));
    var maxValue2 = Math.min.apply(Math, prevPoints.map(p => (p.range ? p.range[maxIndex] + (p.value || 0) : Infinity)));
    var maxValue = Math.min(maxValue1, maxValue2);
    var minValue = Math.max(minValue1, minValue2);
    var nextElements = getElemetsFromPoints(nextPoints);
    var prevElements = getElemetsFromPoints(prevPoints);
    prevElements.forEach(function (element) {
        addClass(element, "border-" + bottom);
    });
    nextElements.forEach(function (element) {
        addClass(element, "border-" + top);
    });
    var resizePadding, resizeDelta = 0, resizeIndex;
    if (+point_next === bound_top) {
        resizePadding = paddingTop;
        resizeDelta = event[clientY] - parseFloat(computed[paddingTop]);
        resizeIndex = b1 === 0 ? b1 : b1 + 2;
    } else if (+point_next === grid[height] - bound_bottom) {
        resizePadding = paddingBottom;
        resizeDelta = event[clientY] + parseFloat(computed[paddingBottom]);
        resizeIndex = b1 === 0 ? b1 + 2 : b1;
    }
    resize[clientY] = [
        nextPoints,
        prevElements,
        nextElements,
        ratio, minValue, maxValue, event[clientY] * ratio - point_next.value,
        height,
        resizeDelta,
        resizeIndex,
        resizePadding
    ];

};

var getXYFromMouseEvent = function (event) {
    var grid = this;
    var position = getScreenPosition(grid);
    var computed = getComputedStyle(grid);
    var clientX = event.clientX - position.left - grid.clientLeft;
    var clientY = event.clientY - position.top - grid.clientTop;
    var [padLeft, padTop, padRight, padBottom] = [
        computed.paddingLeft,
        computed.paddingTop,
        computed.paddingRight,
        computed.paddingBottom,
    ].map(parseFloat);
    var bounds = grid.bounds;
    if (clientX <= padLeft) {
        clientX = clientX / (padRight + padLeft) * (bounds[3] + bounds[1]);
    } else if (clientX >= grid.clientWidth - padRight) {
        clientX = (clientX - grid.cientWidth + padRight) / (padRight + padLeft) * (bounds[1] + bounds[3]);
    } else {
        clientX = bounds[3] + (clientX - padLeft) / (grid.clientWidth - padLeft - padRight) * (grid.width - bounds[1] - bounds[3]);
    }
    if (clientY <= padTop) {
        clientY = clientY / (padBottom + padTop) * (bounds[0] + bounds[2]);
    } else if (clientY >= grid.clientHeight - padTop) {
        clientY = (clientY - grid.clientHeight + padBottom) / (padBottom + padTop) * (bounds[0] + bounds[2]);
    } else {
        clientY = bounds[0] + (clientY - padTop) / (grid.clientHeight - padTop - padBottom) * (grid.height - bounds[0] - bounds[2]);
    }
    return [clientX, clientY];
}

/**
 * 适配指针
 * @param {Event} event 
 */
var adaptCursor = function (event) {
    var grid = this;
    var deltax = 7 / grid.clientWidth * grid.width;
    var deltay = 7 / grid.clientHeight * grid.height;
    if (!grid.bounds) return;
    var [clientX, clientY] = getXYFromMouseEvent.call(grid, event);
    var rect = grid.nearby(clientX, clientY);
    var [x1, y1, x2, y2] = rect;
    var { left, top, right, bottom } = rect;
    var direction = "";
    if (clientY - y1 < deltay) {
        if (y1 !== 0 && !top.solid && !top.top.solid) direction += "n";
    } else if (y2 - clientY < deltay) {
        if (y2 !== grid.height && !top.solid && !bottom.solid) direction += "s";
    }
    if (clientX - x1 < deltax) {
        if (x1 !== 0 && !left.solid && !left.left.solid) direction += "w";
    } else if (x2 - clientX < deltax) {
        if (x2 !== grid.width && !left.solid && !right.solid) direction += "e";
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
        var [points, _, _, ratio, min, max, delta, extra, rDelta, rIndex, rPadding] = editting[k];
        var value = event[k] * ratio - delta;
        if (value < min) {
            value = min;
            var client = Math.ceil((value + delta) / ratio);
        } else if (value > max) {
            value = max;
            var client = Math.floor((value + delta) / ratio);
        } else {
            var client = event[k];
        }
        points.forEach(runPoints);
        if (rPadding) {
            if (rIndex === 0 || rIndex === 3) {
                grid.bounds[rIndex] = value;
                css(grid, { [rPadding]: fromOffset(client - rDelta) });
            } else {
                grid.bounds[rIndex] = grid[extra] - value;
                css(grid, { [rPadding]: fromOffset(rDelta - client) });
            }
        }
    }
    grid.reshape();
};
var clearResizer = function (grid) {
    if (!grid.editting) return;
    var target = grid.editting.target;
    if (target) target.style.zIndex = null;
    var { clientX, clientY } = grid.editting;
    if (clientX) {
        clientX[1].forEach(e => removeClass(e, 'border-right'));
        clientX[2].forEach(e => removeClass(e, 'border-left'));
    }
    if (clientY) {
        clientY[1].forEach(e => removeClass(e, "border-bottom"));
        clientY[2].forEach(e => removeClass(e, "border-top"));
    }
    grid.editting = null;
};

var resizer = function (event) {
    var grid = this;
    if (!grid.direction) return;
    if (!grid.bounds) return;
    //调整大小
    var [clientX, clientY] = getXYFromMouseEvent.call(grid, event);
    var deltax = 7 / grid.clientWidth * grid.width;
    var deltay = 7 / grid.clientHeight * grid.height;
    var area = grid.nearby(clientX, clientY);
    var [x_left, y_top, x_right, y_bottom] = area;
    var resize = {};
    if (clientY - y_top < deltay) {
        //上边
        generateResizeParameters.call(grid, "y", "top", "bottom", "height", area.top, event, 0, resize);
    } else if (y_bottom - clientY < deltay) {
        //下边
        generateResizeParameters.call(grid, "y", "top", "bottom", 'height', area.bottom, event, 0, resize);
    }
    if (clientX - x_left < deltax) {
        //左边
        generateResizeParameters.call(grid, "x", "left", "right", "width", area.left, event, 1, resize);
    } else if (x_right - clientX < deltax) {
        //右边
        generateResizeParameters.call(grid, "x", "left", "right", "width", area.right, event, 1, resize);
    }
    return grid.editting = resize;
};
var gridListener = function () {
    var grid = this;
    var offmousemove;
    offmousemove = onmousemove(window, function (event) {
        if (grid.editable === false || grid.disabled) return;
        if (grid.editting) {
            event.moveLocked = true;
            resizeView.call(grid, event);
        } else {
            adaptCursor.call(grid, event);
        }
    });
    /**
     * 指针按下
     */
    var offmousedown = onmousedown(grid, function (event) {
        if (!resizer.call(this, event)) return;
        var that = this;
        var cancelup = onmouseup(window, function () {
            clearResizer(that);
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
    if (!breakpoints) {
        if (grid.clientHeight || grid.isMounted) {
            createPointsWithChildren.call(grid);
        } else {
            on("append")(grid, createPointsWithChildren);
        }
    } else {
        grid.setData(breakpoints);
        grid.reshape();
    }
    grid.setAttribute("grid", "");
    /**
     * 监听指针移动
     */
    gridListener.call(grid);
    return grid;
}
class Point extends Array {
    constructor(value, range) {
        super();
        var solid = false;
        if (isObject(value)) {
            this.value = value.value;
            var target = value.target;
            range = range || value.range;
            if (target) {
                solid = target.hasAttribute('solid') && target.getAttribute('solid') !== 'false' || !!target.solid;
                this.target = target;
            }

        } else {
            this.value = value;
        }
        range = range || [0, 0, Infinity, Infinity];
        this.range = range;
        this.solid = solid;
    }
    valueOf() {
        return this.value;
    }
}
var createPoints = function (values, direction = "x", result = new Point(0)) {
    if (!(values instanceof Array)) values = arguments;
    for (var cx = 0, dx = values.length; cx < dx; cx++) {
        var value = values[cx];
        if (value instanceof Array && value.constructor !== Point) {
            if (!result.length) throw new Error("数据转换为grid失败！");
            createPoints(value, direction === "x" ? "y" : "x", result[result.length - 1]);
        } else {
            var breakpoint = new Point(value);
            breakpoint.direction = direction;
            breakpoint.parent = result;
            result.push(breakpoint);
        }
    }
    return result;
};
var bindToOrderedSpliters = function (split_points, target, value, side) {
    if (isObject(value)) {
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
    resizeCell(cell, side, delta) {
        side = side.toLowerCase();
        var { left, top, right, bottom } = getScreenPosition(cell);
        var clientX, clientY, targetX, targetY;
        var direction;
        switch (side.toLowerCase()[0]) {
            case "l":
            case "w":
                direction = 'w';
                clientX = left;
                targetX = left + delta;
                targetY = clientY = top + bottom >> 1;
                break;
            case "t":
            case "n":
                direction = 'n';
                clientY = top;
                targetY = top + delta;
                targetX = clientX = left + right >> 1;
                break;
            case "r":
            case "e":
                direction = 'e';
                clientX = right;
                targetX = right + delta;
                targetY = clientY = left + right >> 1;

                break;
            case "b":
            case "s":
                direction = 's';
                clientX = bottom;
                targetY = bottom + delta;
                targetX = clientX = left + right >> 1;
                break;
            default:
                throw new Error("参数不支持", side);
        }
        this.direction = direction;
        var e = resizer.call(this, { clientX, clientY, target: cell });
        if (!e) return;
        resizeView.call(this, { clientX: targetX, clientY: targetY, target: cell });
        clearResizer(this);
        this.direction = '';
    },
    setGrid(breakpoints, bounds) {
        var grid = this;
        if (!bounds) {
            bounds = createBoundsFromComputed(grid);
        }
        if (!breakpoints) {
            var breakpoints = createPoints([]);
        } else {
            breakpoints = createPoints(breakpoints);
        }
        this.forEachCell(e => remove(e.target));
        grid.bounds = bounds;
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
        if (this.isMounted || this.offsetWidth || this.offsetHeight) {
            this._reshape();
        } else {
            once("append")(this, this._reshape);
        }
    },
    _reshape() {
        var grid = this;
        var bounds = this.bounds;
        var current_l, current_t, current_w, current_h, current_d = this.breakpoints.direction, current_r = new Point(grid.width), current_b = new Point(grid.height);
        // var xPoints = [];
        // var yPoints = [];
        var getDivSize = function (top, height, bounds_top, bounds_bottom, grid_height, grid_padding_top, grid_padding_bottom) {
            var rest_height = 0;
            if (top + height > grid_height) {
                height = grid_height - top;
            }
            if (top < bounds_top) {
                rest_height += bounds_top - top;
            }
            if (top > grid_height - bounds_bottom) {
                rest_height = height;
            }
            else if (top + height > grid_height - bounds_bottom) {
                rest_height += top + height - grid_height + bounds_bottom;
            }
            if (rest_height < 1) {
                return (height - rest_height) / (grid_height - bounds_bottom - bounds_top) * 100 + "%";
            }
            var rest_offset = fromOffset(rest_height / (bounds_top + bounds_bottom) * (parseFloat(grid_padding_top) + parseFloat(grid_padding_bottom)));
            if (rest_height < height) {
                return `calc(${(height - rest_height) / (grid_height - bounds_bottom - bounds_top) * 100}% + ${rest_offset})`;
            }
            return rest_offset;
        }
        var setRelativeDiv = function (_div, width, height, left, top) {
            var [bounds_top, bounds_right, bounds_bottom, bounds_left] = bounds;
            var computed = getComputedStyle(grid);
            css(_div, {
                width: getDivSize(left, width, bounds_left, bounds_right, grid.width, computed.paddingLeft, computed.paddingRight),
                height: getDivSize(top, height, bounds_top, bounds_bottom, grid.height, computed.paddingTop, computed.paddingBottom)
            });
            if (top <= 0) {
                css(_div, { marginTop: fromOffset(- parseFloat(computed.paddingTop)) });
            } else if (top + height >= grid.height) {
                css(_div, { marginBottom: fromOffset(-parseFloat(computed.paddingBottom)) });
            }
            if (left <= 0) {
                css(_div, { marginLeft: fromOffset(-parseFloat(computed.paddingLeft)) });
            } else if (left + width >= grid.width) {
                css(_div, { marginRight: fromOffset(-parseFloat(computed.paddingRight)) });
            }
        }
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
                    // point.target = _div = document.createElement('cell');
                }
                if (_div && _div.parentNode !== grid) appendChild(grid, _div);
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
                        if (_div) {
                            if (getComputedStyle(_div).position === 'absolute') {
                                css(_div, {
                                    left: point.value / grid.width * 100 + "%",
                                    top: current_t ? current_t.value / grid.height * 100 + "%" : 0,
                                    width: current_value / grid.width * 100 + "%",
                                    height: (current_h / grid.height || 0) * 100 + "%"
                                });
                            } else {
                                setRelativeDiv(_div, current_value, current_h, point.value, current_t ? current_t.value : 0);
                            }
                        }
                        point.width = current_value / grid.width;
                        point.height = current_h / grid.height;
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
                        if (_div) {
                            if (getComputedStyle(_div).position === 'absolute') {
                                css(_div, {
                                    left: current_l ? current_l.value / grid.width * 100 + "%" : 0,
                                    top: point.value / grid.height * 100 + "%",
                                    width: (current_w / grid.width || 0) * 100 + "%",
                                    height: current_value / grid.height * 100 + "%"
                                });
                            } else {
                                setRelativeDiv(_div, current_w, current_value, current_l ? current_l.value : 0, point.value);
                            }
                        }
                        point.width = current_w / grid.width;
                        point.height = current_value / grid.height;
                    }
                }
            }
        };
        append(this.breakpoints);
        var reshapecount = 0;
        var store = function (point) {
            if (point.length) {
                point.forEach(store);
            } else if (point.origin !== point.value) {
                reshapecount++;
                point.origin = point.value;
            }
        };
        store(this.breakpoints);
        if (reshapecount > 0) {
            dispatch(grid, 'shaped');
        }
    },
    seprate(x) {
        saveToOrderedArray(this.breakpoints, new Point(x));
    },
    nearby(x, y) {
        var breakpoints = this.breakpoints;
        var breakpath = [];
        var maxXStart = new Point(0), maxYStart = new Point(0);
        var minXEnd = new Point(this.width);
        var minYEnd = new Point(this.height);
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
var trimOrderedArray = function (arr, x1, x2) {
    var i1 = getIndexFromOrderedArray(arr, x1);
    var i2 = getIndexFromOrderedArray(arr, x2);
    if (i2 - i1 > 1) {
        arr.splice(i1 + 1, i2 - i1 - 1);
    }
}
var createPointsFromElements = function (elements, xList, yList) {
    elements.forEach(e => saveToOrderedArray(xList, e[1])
        & saveToOrderedArray(xList, e[2])
        & saveToOrderedArray(yList, e[3])
        & saveToOrderedArray(yList, e[4])
    );
    elements.forEach(e => {
        trimOrderedArray(xList, e[1], e[2]);
        trimOrderedArray(yList, e[3], e[4]);
    });
    if (yList.length > 2) {
        for (var cx = yList.length - 1; cx >= 1; cx--) {
            var y1 = yList[cx - 1];
            var y2 = yList[cx];
            var temp = elements.filter(e => e[3] >= y1 && e[4] <= y2);
            if (temp.length > 1) {
                var children = createPointsFromElements(temp, [xList[0], xList[xList.length - 1]], [y1, y2]);
                if (children.length) {
                    yList.splice(cx, 0, children);
                }
            } else if (temp.length === 1) {
                yList[cx - 1] = new Point({ value: y1, target: temp[0][0], range: temp[0][5] })
            } else {
                yList.splice(cx - 1, 1);
            }
        }
        yList.direction = "y";
        yList.pop();
        return yList;
    }
    if (xList.length > 2) {
        for (var cx = xList.length - 1; cx >= 1; cx--) {
            var x1 = xList[cx - 1];
            var x2 = xList[cx];
            var temp = elements.filter(e => e[1] >= x1 && e[2] <= x2);
            if (temp.length > 1) {
                var children = createPointsFromElements(temp, [x1, x2], [yList[0], yList[yList.length - 1]]);
                if (children.length) xList.splice(cx, 0, children);
            } else if (temp.length === 1) {
                xList[cx - 1] = new Point({ value: x1, target: temp[0][0], range: temp[0][5] })
            } else {
                xList.splice(cx - 1, 1);
            }
        }
        xList.pop();
        xList.direction = 'x';
        return xList;
    }
    return [];
};
var createBoundsFromComputed = function (grid) {
    var computed = getComputedStyle(grid);
    var limit = [
        parseFloat(computed.paddingTop) * grid.height / grid.clientHeight,
        parseFloat(computed.paddingRight) * grid.width / grid.clientWidth,
        parseFloat(computed.paddingBottom) * grid.height / grid.clientHeight,
        parseFloat(computed.paddingLeft) * grid.width / grid.clientWidth
    ].map(a => +a.toFixed(0) || 0);
    return limit;
};
var createPointsWithChildren = function () {
    var grid = this;
    var children = [];
    for (var c of grid.children) {
        var s = getComputedStyle(c);
        if (s.display === 'none' || /^(fixed|absolute)$/i.test(s.position)) continue;
        children.push(c);
    }
    if (children.length < 2 || grid.adapted) return;
    grid.adapted = true;
    var getRange = function (e) {
        var range = [0, 0, Infinity, Infinity];
        var computed = getComputedStyle(e);
        range[0] = parseFloat(computed.minWidth) * grid.width / grid.clientWidth || range[0];
        range[1] = parseFloat(computed.minHeight) * grid.height / grid.clientHeight || range[1];
        range[2] = parseFloat(computed.maxWidth) * grid.width / grid.clientWidth || range[2];
        range[3] = parseFloat(computed.maxHeight) * grid.height / grid.clientWidth || range[3];
        range[0] = Math.ceil(range[0]);
        range[1] = Math.ceil(range[1]);
        range[2] = Math.floor(range[2]);
        range[3] = Math.floor(range[3]);
        return range;
    };
    var elements = children.map(a => [a,
        +Math.max(0, a.offsetLeft * grid.width / grid.clientWidth).toFixed(0),
        +(Math.min(a.offsetLeft + a.offsetWidth, grid.clientWidth) * grid.width / grid.clientWidth).toFixed(0),
        +Math.max(0, a.offsetTop * grid.height / grid.clientHeight).toFixed(0),
        +(Math.min(a.offsetTop + a.offsetHeight, grid.clientHeight) * grid.height / grid.clientHeight).toFixed(0),
        getRange(a)
    ]);
    var points = createPointsFromElements(elements, [0, grid.width], [0, grid.height]);
    if (points.direction === 'y') {
        points = [0, points];
    }
    grid.setData(points);
    grid.reshape();
};
function main(elem) {
    if (isElement(elem)) {
        elem = grid.call(elem);
        elem.adapt = createPointsWithChildren;
        care(elem, elem.setData);
        care(elem, elem.reshape);
    } else {
        elem = grid.call(document.createElement('grid'), elem);
    }
    on('click')(elem, actionemiter);
    return elem;
}