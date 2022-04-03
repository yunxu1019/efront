
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
    Array.prototype.forEach.call(tr.children, function (td) {
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
var forEachTableRow = function (table, call) {
    for (var tr of table.children) {
        if (isTableRow(tr)) {
            call(tr);
        }
        else {
            for (var c of tr.children) if (isTableRow(c)) call(c);
        }
    }
}
var getRowsOfTdsByCol = function (table, start, end) {
    var savedRowDeltas = [];
    var savedCollections = [];
    forEachTableRow(table, function (tr) {
        var collections = markRowTds(tr, savedRowDeltas, start, end);
        savedCollections.push(collections);
    })
    return savedCollections;
}
var getTdsByCol = function (table, start, end) {
    return [].concat.apply([], getRowsOfTdsByCol(table, start, end));
};
var resizeT = function (t, w) {
    if (!w) {
        var w = 0;
        for (var cx = 0, dx = t.children.length; cx < dx; cx++) {
            w += t.children[cx].offsetWidth;
        }
    }
    css(t, { width: w });
}
var getThead = function (table) {
    for (var c of table.children) {
        if (/^thead$/i.test(c.tagName) || c.hasAttribute('thead')) return c;
    }
};
var getTbody = function (table) {
    for (var c of table.children) {
        if (/^tbody$/i.test(c.tagName) || c.hasAttribute("tbody")) return c;
    }
};
var isTableRow = function (e) {
    return trElementReg.test(e.tagName);
};
var resizeTarget = function (event) {
    var { resizing } = this;
    if (!resizing) return;
    event.moveLocked = true;
    var { restX, target } = resizing;
    var targetW = event.clientX - restX;
    if (targetW < 20) targetW = 20;
    var deltaW = targetW - target.offsetWidth;
    forEachTableRow(this, function (tr) {
        resizeT(tr, tr.offsetWidth + deltaW);
    });
    for (var c of this.children) {
        if (!isTableRow(c)) {
            var tr = c.querySelector('tr');
            c.style.width = tr.style.width;
        }
    }
    var { colstart, colend } = target;
    var ts = getRowsOfTdsByCol(this, colstart, colend);
    for (var cs of ts) {
        var c = cs[cs.length - 1];
        var w = 0;
        for (var c of cs) {
            w += c.offsetWidth;
        }
        w = targetW - w;
        while (w !== 0) {
            var c = cs.pop();
            var w0 = c.offsetWidth + w;
            if (w0 < 0) {
                w = -w0;
                w0 = w;
            }
            else {
                w = 0;
            }
            if (targetW !== w) css(c, { width: w0 });
        }
    }
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
var tbodyHeight = function (tbody) {
    return { 'max-height': ((innerHeight - getScreenPosition(tbody).top - 16) / 32 | 0) * 32 }
};

var setFixed = function (children, scrolled, left, borderRight) {
    var setBorderRight = function (fixedLeft) {
        var end = fixedLeft[fixedLeft.length - 1];
        if (end && end.style[left]) css(end, {
            [borderRight]: '1px solid #0006'
        });
    };
    var fixedElements = [];
    var offset = 0;
    var fixedWidth = 0;
    for (var c of children) {
        var pc = getScreenPosition(c);
        var isfixed = c.hasAttribute('fixed');
        if (fixedWidth + scrolled > offset && fixedWidth + pc.width < this.clientWidth / 3) {
            if (isfixed) {
                css(c, { [left]: scrolled - offset + fixedWidth, [borderRight]: '' });
                fixedElements.push(c);
                fixedWidth += pc.width;
            }
        }
        else {
            setBorderRight(fixedElements);
            if (isfixed && c.style[left]) {
                css(c, { [left]: '', [borderRight]: '' })
                fixedElements.push(c);
            }
        }
        offset += pc.width;
    }
    setBorderRight(fixedElements);
    for (var f of fixedElements) {
        var cols = getRowsOfTdsByCol(this, f.colstart, f.colend);
        for (var c of cols) css(c[0], {
            [left]: f.style[left],
            [borderRight]: f.style[borderRight]
        });
    }

};


var setFixedColumn = function () {
    var thead = getThead(this);
    if (!thead) return;
    if (!isTableRow(thead)) thead = thead.querySelector('tr');
    var children = Array.prototype.slice.call(thead.children);
    setFixed.call(this, children, this.scrollLeft, 'left', 'borderRight');
    setFixed.call(this, children.reverse(), this.scrollWidth - this.clientWidth - this.scrollLeft, 'right', 'borderLeft');
};

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
            thead = getThead(table);
        }
        if (!getTargetIn(thead, event.target)) return;
        if (table.resizing) return;
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
    var markedRows = false;
    var cellMatchManager = function (element) {
        if (!thead) {
            [thead] = table.getElementsByTagName("thead");
            if (!thead) thead = table.querySelector('[thead]');
        }
        if (!getTargetIn(thead, element)) return false;
        if (!tdElementReg.test(element.tagName)) return false;
        if (!markedRows) {
            var savedRowDeltas = [];
            [].map.call(thead.children, function (tr) {
                markRowTds(tr, savedRowDeltas);
            });
            markedRows = true;
        }
        var { colstart, colend } = element;
        return getTdsByCol(table, colstart, colend);
    };

    table.dragbox = function () {
        return thead;
    };
    table.useIncrease = false;
    var _vbox = function () {
        table.$Left = function (x) {
            if (isFinite(x)) this.scrollLeft = x;
            setFixedColumn.call(this);
            return this.scrollLeft;
        };
        vbox(table, 'x');
    };
    care(table, function ([fields, data]) {
        if (_vbox) _vbox(), _vbox = null;
        thead = null;
        fields.forEach(enrichField);
        remove(this.children);
        this.innerHTML = template;
        markedRows = false;
        this.style.display = 'block';
        render(this, {
            fields,
            tbody(e) {
                var e = list.apply(null, arguments);
                css(e, tbodyHeight(e));
                css(e, { width: this.adapter.offsetWidth, display: 'block' });
                return e;
            },
            thead(t) {
                var tr = document.createElement('thead');
                tr.renders = [function () {
                    resizeT(this.firstChild)
                }];
                css(tr, { display: 'block' });
                appendChild(tr, Array.prototype.slice.call(t.children));
                return tr;
            },
            tbodyHeight,
            data,
            adapter: null,
            resizeT,
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
            setFixedColumn,
        }, this.$parentScopes.concat(this.$scope));
    })
    autodragchildren(
        table,
        cellMatchManager,
        function (src, dst, rel, append, parentNode) {
            if (table.src) {
                if (src < 1 || dst < 1) return false;
                var fields = parentNode.$scope.fields;
                var [f] = fields.splice(src - 1, 1);
                fields.splice(dst - 1, 0, f);
            }
            markedRows = false;
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
    resizingList.set(table);
    on("resize")(table, setFixedColumn);
    on("scroll")(table, setFixedColumn);
    return table;
}
