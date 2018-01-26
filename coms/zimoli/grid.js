var grids = [];

function grid(breakpoints) {
    var grid = div();
    extend(grid, grid_prototype);
    if (!breakpoints) {
        var breakpoints = [Point(0), Point(80), Point(160)];
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
        cancelmove = onmousemove(document, function (event) {
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
        var cancelup = onmouseup(document, function () {
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
var grid_prototype = {
    breakpoints: [],
    init() {
        var that = this;
        var current_x, current_y, current_w, current_h
        var append = function (point) {
            if (point.length) {
                point.map(append);
            } else {
                var _div = div();
                css(_div, {
                    left: point.left || 0,
                    top: point.top || 0,
                    width: point.width || that.offsetWidth + "px",
                    height: point.height || that.offsetHeight + "px"
                });
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
            var value = isX ? x : y;//先y后x;
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
        area.d = area.direction = isX ? "X" : "Y";
        return area;
    },
};
console.log(getIndexFromOrderedArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5), "getIndexFromOrderedArray");