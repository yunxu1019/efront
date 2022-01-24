
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
                if (position.right >= getScreenPosition(this).right - 7) {
                    target = this;
                    return;
                }
                css(document.body, { 'cursor': 'col-resize' });
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
        css(document.body, { 'cursor': '' });
    }
};
var tdElementReg = /^t[hd]$/i;
var trElementReg = /^tr$/i;
var id = 0;
function enrichField(f) {
    if (!f.id) f.id = ++id;
    if (f.width) return;
    var width;
    if (f.size) {
        width = f.size;
        if (width < 40) width = width * 16;
    }
    else switch (f.type) {
        case "text":
            width = 30;
            break;
        case "input":
            width = 200;
            break;
        case "date":
            width = 180;
        case "datetime":
            width = 200;
            break;
        case "time":
            width = 120;
            break;
        default:
            if (f.options) {
                width = f.options.map(o => o.name instanceof Function ? o.name() : o.name).join(" ").length * 20;
            } else {
                width = String(f.name || f.key).length * 16;
            }
    }
    if (width > 600) width = 600;
    f.width = width + 60;
}


function table(elem) {
    var tableElement = isElement(elem) ? elem : document.createElement("table");
    var activeCols = [];
    var adaptCursor = adaptTarget.bind(tableElement);
    var off;
    tableElement.init = function () {
        off = on("mousemove")(window, adaptCursor);
    };
    tableElement.dispose = tableElement.destroy = function () {
        off();
    };
    on("append")(tableElement, tableElement.init);
    on("remove")(tableElement, tableElement.destroy);
    if (isMounted(tableElement)) tableElement.init();

    moveupon(tableElement, {
        start(event) {
            if (this.resizing) event.preventDefault();
        },
        move: resizeTarget,
    });
    onmousemove(tableElement, function (event) {
        if (!thead) {
            [thead] = table.getElementsByTagName("thead");
            if (!thead) thead = table.querySelector('[thead]');
        }
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
    var table = tableElement;
    var thead;
    var cellMatchManager = function (element) {
        if (!thead) {
            [thead] = table.getElementsByTagName("thead");
            if (!thead) thead = table.querySelector('[thead]');
        }
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
        thead = null;
        this.innerHTML = template;
        fields.forEach(enrichField);
        render(this, {
            fields,
            tbody: list,
            innerHeight: {
                valueOf() {
                    return innerHeight - getScreenPosition(table).top;
                }
            },
            data,
            adapter: null,
            model,
            sort(f) {
                f.sign = f.sign > 0 ? -1 : 1;
                data.sort(function (a, b) {
                    a = seek(a, f.key);
                    b = seek(b, f.key);
                    if (a > b) return f.sign;
                    if (a < b) return -f.sign;
                    return 0;
                });
            },
            setWidth(target, f) {
                css(target, { width: f.width });
            },
            a: button,
        }, this.$parentScopes.concat(this.$scope));
    })
    autodragchildren(
        table,
        cellMatchManager,
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
