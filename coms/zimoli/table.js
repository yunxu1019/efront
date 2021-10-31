
var recover = function (element) {
    moveMargin(element, 0);
};

var moveMargin = function (element, movePixels) {
    if (element.moved === movePixels) return;
    element.moved = movePixels;
    element.moving = new Date;
    css(element, {
        marginLeft: movePixels ? movePixels + "px" : "",
        marginRight: movePixels ? -movePixels + "px" : ""
    });
};

var markRowTds = function (tr, deltas, colstart, colend) {
    var inc = 0;
    var collections = [];
    [].map.call(tr.children, function (td) {
        while (deltas[inc] > 0) {
            deltas[inc++]--;
        }
        var colspan = +td.getAttribute("colspan") || 1;
        var rowspan = +td.getAttribute("rowspan") || 1;
        rowspan = rowspan > 1 ? rowspan - 1 : 0;
        colspan = colspan > 1 ? colspan - 1 : 0;
        for (var cx = inc, dx = colspan + inc; cx <= dx; cx++) {
            if (!(deltas[cx] >= rowspan)) deltas[cx] = rowspan;
        }
        td.colstart = inc;
        td.colend = dx;
        if (inc >= colstart && dx <= colend) {
            collections.push(td);
        } else if (dx + 1 <= colstart) {
            collections.prev = td;
        } else if (inc - 1 >= colend && !collections.next) {
            collections.next = td;
        }
        inc = dx + 1;
    });
    return collections;
};
var getRowsOfTdsByCol = function (table, start, end) {
    var savedRowDeltas = [];
    var savedCollections = [];
    [].map.call(table.children, function (tr) {
        if (trElementReg.test(tr.tagName)) {
            var collections = markRowTds(tr, savedRowDeltas, start, end);
            savedCollections.push(collections);
        }
        else {
            var collections = getRowsOfTdsByCol(tr, start, end);
            savedCollections.push.apply(savedCollections, collections);
        }
    });
    return savedCollections;
}
var getTdsByCol = function (table, start, end) {
    return [].concat.apply([], getRowsOfTdsByCol(table, start, end));
};
var resizeTarget = function (event) {
    var { resizing } = this;
    if (!resizing) return;
    event.moveLocked = true;
    var { restX, target } = resizing;
    var targetX = event.clientX - restX;
    target.style.width = targetX + "px";
    resizing.clientX = event.clientX;
};
var getFirstSingleColCell = function (table, col) {
    var tds = getTdsByCol(table, col, col);
    while (tds.length) {
        var td = tds.shift();
        var colspan = td.getAttribute("colspan") || 1;
        if (1 === +colspan) return td;
    }
}
var adaptTarget = function (event) {
    if (event.which) return;
    var target = event.target;
    while (target && !tdElementReg.test(target.tagName)) {
        target = target.parentNode;
    }
    var result;
    if (target) {
        var position = getScreenPosition(target);
        if (event.clientX - position.left < 7 || position.right - event.clientX < 7) {
            event.preventDefault();
            if (event.clientX - position.left < 7) {
                target = target.previousSibling;
            }
            if (target) target = getFirstSingleColCell(this, target.colend);
            if (target) {
                css(this, { 'cursor': 'e-resize' });
                result = {
                    target,
                    restX: event.clientX - target.offsetWidth
                };
                this.resizing = result;
            }
        }
    }
    if (!result) {
        this.resizing = false;
        css(this, { 'cursor': 'default' });
    }
};
var tdElementReg = /^t[hd]$/i;
var trElementReg = /^tr$/i;

function table(elem) {
    var tableElement = isElement(elem) ? elem : document.createElement("table");
    var activeCols = [];
    onmousemove(tableElement, adaptTarget);
    moveupon(tableElement, {
        start() { },
        move: resizeTarget,
    });
    onmousemove(tableElement, function (event) {
        if (!getTargetIn(thead, event.target)) return;
        var tds = getTargetIn(cellMatchManager, event.target);
        if (!isArray(tds)) tds = [];
        tds.map(function (td) {
            td.ying = true;
        });
        activeCols.map(function (td) {
            if (!td.ying) removeClass(td, "y-ing");
        });
        activeCols = tds.map(function (td) {
            addClass(td, "y-ing");
            delete td.ying;
            return td;
        });
    });
    onmouseleave(tableElement, function () {
        activeCols.map(function (td) {
            removeClass(td, "y-ing");
        });
    });
    var table = tableElement.hasAttribute("ng-src") || tableElement.hasAttribute("src") ? list(tableElement) : tableElement;
    var thead;
    var cellMatchManager = function (element) {
        if (!thead) [thead] = table.getElementsByTagName("thead");
        if (table.resizing) return false;
        if (!getTargetIn(thead, element)) return false;
        if (!tdElementReg.test(element.tagName)) return false;
        var savedRowDeltas = [];
        [].map.call(thead.children, function (tr) {
            markRowTds(tr, savedRowDeltas);
        });
        var { colstart, colend } = element;
        return getTdsByCol(table, colstart, colend);
    };
    table.dragbox = function () {
        return thead;
    };
    care(table, function ([fields, data]) {
        this.innerHTML = template;
        render(this, {
            fields,
            tbody: list,
            data,
            a: button,
        }, this.$parentScopes.concat(this.$scope));
    })
    autodragchildren(
        table,
        function(a){
            console.log('match')
            return cellMatchManager.apply(this,arguments);
        },
        function (src, dst, rel, append, parentNode) {
            if (table.src) {
                var [fields] = table.src;
                var [f] = fields.splice(src, 1);
                fields.splice(dst, 0, f);
            }
            var children = parentNode.children;
            var srcElement = children[src];
            var dstElement = children[rel];
            var dstTds = getRowsOfTdsByCol(table, dstElement.colstart, dstElement.colend);
            var srcTds = getRowsOfTdsByCol(table, srcElement.colstart, srcElement.colend);
            if (append === appendChild.before) {
                srcTds.map(function (src, cx) {
                    var dst = dstTds[cx];
                    var d = dst[0] || dst.next;
                    if (d) src.map(function (s) {
                        append(d, s);
                    });
                    else if (d = dst.prev) src.map(function (s) {
                        appendChild.after(d, s);
                        d = s;
                    });
                })
            } else {
                srcTds.map(function (src, cx) {
                    var dst = dstTds[cx];
                    var d = dst[dst.length - 1] || dst.prev;
                    if (d) src.map(function (s) {
                        append(d, s);
                        d = s;
                    });
                    else if (d = dst.next) src.map(function (s) {
                        appendChild.before(d, s);
                    });
                });

            }
        }
    );
    return table;
}
