
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
        var colspan = getColspan(td);
        var rowspan = getRowspan(td);
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
var forEachRow = function (tbody, call) {
    for (var tr of tbody.children) {
        if (isTfoot(tr)) continue;
        if (isTableRow(tr)) {
            call(tr);
        }
        else {
            for (var c of tr.children) if (isTableRow(c)) call(c);
        }
    }
}
var getRowsOfTdsByCol = function (table, start, end) {
    var savedCollections = [];
    var thead = getThead(table);
    var tbody = getTbody(table);
    var savedRowDeltas;
    if (thead) savedRowDeltas = [], forEachRow(thead, function (tr) {
        var collections = markRowTds(tr, savedRowDeltas, start, end);
        savedCollections.push(collections);
    });
    if (tbody) savedRowDeltas = [], forEachRow(tbody, function (tr) {
        var collections = markRowTds(tr, savedRowDeltas, start, end);
        savedCollections.push(collections);
    });
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
var isTfoot = function (c) {
    return /^tfoot$/i.test(c.tagName) || c.hasAttribute("tfoot");
}
var getTfoot = function (table) {
    for (var c of table.children) {
        if (isTfoot(c)) return c;
    }
};
var isTableRow = function (e) {
    return trElementReg.test(e.tagName);
};
var getRowspan = function (e) {
    return +e.getAttribute('rowspan') || 1;
};
var getColspan = function (e) {
    return +e.getAttribute('colspan') || 1;
}
var resizeColumn = function (target, targetW) {
    var deltaW = targetW - target.offsetWidth;
    forEachRow(this, function (tr) {
        resizeT(tr, tr.offsetWidth + deltaW);
    });
    for (var c of this.children) {
        if (isTfoot(c)) continue;
        if (!isTableRow(c)) {
            var tr = c.querySelector('tr');
            if (!tr) continue;
            c.style.width = tr.style.width;
        }
    }
    var { colstart, colend } = target;
    if (isEmpty(colstart) || isEmpty(colend)) return;
    var ts = getRowsOfTdsByCol(this, colstart, colend);
    for (var cs of ts) {
        var c = cs[cs.length - 1];
        var w = 0;
        for (var c of cs) {
            w += c.offsetWidth;
        }
        if (!cs.length) continue;
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
};
var resizeTarget = function (event) {
    var { resizing } = this;
    if (!resizing) return;
    event.moveLocked = true;
    var { restX, target } = resizing;
    var targetW = event.clientX - restX;
    if (targetW < 20) targetW = 20;
    resizeColumn.call(this, target, targetW);
    resizing.clientX = event.clientX;
    setFixedColumn.call(this);
};
var getFirstSingleColCell = function (table, col) {
    var tds = getTdsByCol(table, col, col);
    while (tds.length) {
        var td = tds.shift();
        var colspan = getColspan(td);
        if (1 === colspan) return td;
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
        case "html":
            width = 200;
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
    if (!f.key && f.options && isEmpty(f.fixed)) {
        f.fixed = true;
    }
}
var tbodyHeight = function (tbody, hasFoot) {
    var rowHeight = calcPixel(36);
    return { 'max-height': ((innerHeight - (!!hasFoot ? rowHeight : 6) - getScreenPosition(tbody).top - 10) / rowHeight | 0) * rowHeight }
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
        if (isfixed) {
            if (fixedWidth + scrolled > offset && fixedWidth + pc.width < this.clientWidth / 3) {
                css(c, { [left]: scrolled - offset + fixedWidth, [borderRight]: '' });
                fixedElements.push(c);
                fixedWidth += pc.width;
            }
            else {
                if (c.style[left]) {
                    css(c, { [left]: '', [borderRight]: '' })
                    fixedElements.push(c);
                }
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


var setFixedColumn = function (remark) {
    var thead = getThead(this);
    if (!thead) return;
    remark = remark === true;
    if (remark) remark = [], forEachRow(thead, function (tr) {
        markRowTds(tr, remark);
    });
    if (!isTableRow(thead)) thead = thead.querySelector('tr');
    var children = Array.prototype.slice.call(thead.children);
    var lastChild = children[children.length - 1];
    var lastFieldChild = children[children.length - 2];
    if (children.length <= 2) lastFieldChild = null;
    if (!lastChild) return;
    var cindex = children.length - 1;
    if (lastFieldChild) css(lastChild, { width: 0 }), lastChild = lastFieldChild, cindex = children.length - 2;
    var deltaW = thead.scrollWidth - lastChild.offsetWidth;
    if (this.clientWidth > deltaW + lastChild.offsetWidth) {
        css(lastChild, { width: this.clientWidth - deltaW });
        css(thead, { width: this.clientWidth });
        resizeColumn.call(this, lastChild, this.clientWidth - deltaW);
        remark = true;
    }
    if (remark) {
        var tbody = getTbody(this);
        forEachRow(tbody, function (tr) {
            css(tr.children[cindex], lastChild.style);
        });
        css(tbody, { width: thead.offsetWidth });
    }
    setFixed.call(this, children, this.scrollLeft, 'left', 'borderRight');
    setFixed.call(this, children.reverse(), this.scrollWidth - this.clientWidth - this.scrollLeft, 'right', 'borderLeft');
    var tfoot = getTfoot(this);
    if (tfoot) {
        css(tfoot, { left: this.scrollLeft });
    }
};
var setLazyFixedColumn = lazy(setFixedColumn, 0);
var setClass = function (tds, cls, old) {
    tds.forEach(td => td[cls] = true);
    old.forEach(td => { if (!td[cls]) removeClass(td, cls) });
    tds.forEach(td => { addClass(td, cls); delete td[cls] });
};
var removeYIng = function (activeCols) {
    activeCols.forEach(function (td) {
        removeClass(td, 'y-ing');
    });
};
var removeXIng = function (activeRows) {
    activeRows.forEach(function (td) {
        removeClass(td, 'x-ing');
    });
};

var getTdsOfSameRow = function (td) {
    var tds = [td];
    var tmp = td;
    var rowspan = getRowspan(td);
    var { colstart, colend } = td;
    while (tmp) {
        tmp = tmp.previousElementSibling;
        if (!tmp) break;
        if (colstart - tmp.colend > 1) break;
        if (getRowspan(tmp) > rowspan) break;
        tds.push(tmp);
        colstart = tmp.colstart;
    };
    tmp = td;
    while (tmp) {
        tmp = tmp.nextElementSibling;
        if (!tmp) break;
        if (tmp.colstart - colend > 1) break;
        if (getRowspan(tmp) > rowspan) break;
        tds.push(tmp);
        colend = tmp.colend;
    }
    var tr = td.parentNode;
    while (rowspan > 1) {
        tr = tr.nextElementSibling;
        if (!tr) break;
        for (var c of tr.children) {
            if (c.colstart >= colstart && c.colend <= colend) {
                if (getRowspan(c) <= rowspan) {
                    tds.push(c);
                }
            }
        }
        rowspan--;
    }
    return tds;
};
function setContextMenu(thead) {
    var fields = this.fields.slice();
    var scope = this;
    var menuItems = fields.map(f => {
        return {
            name: f.name || "&nbsp;",
            checked: !f.hidden,
            width: f.width,
            do() {
                this.checked = !this.checked;
                f.hidden = !this.checked;
                scope.fields = fields.filter(f => !f.hidden);
                var width = thead.scrollWidth / scope.fields.length;
                if (!width || width < 200) width = 200;
                forEachRow(thead, function (tr) {
                    for (var td of tr.children) {
                        if (td.offsetWidth > width) css(td, { width });
                    }
                });
                setLazyFixedColumn.call(thead.parentNode, true)
            }
        }
    });
    contextmenu(thead, menuItems);
}
function table(elem) {
    var tableElement = isElement(elem) ? elem : document.createElement("table");
    var activeCols = [];
    bind('mousemove')(tableElement, adaptTarget);
    moveupon(tableElement, {
        start(event) {
            if (this.resizing) event.preventDefault();
        },
        move: resizeTarget,
    });
    var activeRows = [];
    onmousemove(tableElement, function (event) {
        if (table.resizing) return;
        var tbody = getTbody(table);
        a: if (tbody) {
            var tr = getTargetIn(tbody, event.target, false);
            if (!tr) break a;
            var td = getTargetIn(tr, event.target, false);
            if (!td) break a;
            var tds = getTdsOfSameRow(td);
            removeYIng(activeCols);
            setClass(tds, 'x-ing', activeRows);
            activeRows = tds;
            return;
        }
        if (!thead) {
            thead = getThead(table);
        }
        if (!getTargetIn(thead, event.target)) return;
        var tds = cellMatchManager(event.target);
        if (!tds) return;
        setClass(tds, 'y-ing', activeCols);
        removeXIng(activeRows);
        activeCols = tds;
    });
    onmouseleave(tableElement, function () {
        removeYIng(activeCols);
        removeXIng(activeRows);
    });
    var table = tableElement;
    var thead;
    var markedRows = false;
    var markThead = function () {
        var savedRowDeltas = [];
        Array.prototype.forEach.call(thead.children, function (tr) {
            markRowTds(tr, savedRowDeltas);
        });
    };
    var cellMatchManager = function (element) {
        if (!thead) thead = getThead(table);
        if (!getTargetIn(thead, element)) return false;
        if (!tdElementReg.test(element.tagName)) return false;
        if (!markedRows) {
            markThead();
            markedRows = true;
        }
        var { colstart, colend } = element;
        return getTdsByCol(table, colstart, colend);
    };
    watch(table, {
        showTotal(v) {
            this.$scope.showTotal = v;
            if (v) this.$scope.hasFoot = true;
        }
    })
    table.useIncrease = false;
    var _vbox = function () {
        table.$Left = function (x) {
            if (isFinite(x)) this.scrollLeft = x, setFixedColumn.call(this);
            return this.scrollLeft;
        };
        vbox(table, 'x');
    };
    care(table, async function ([fields, data]) {
        if (_vbox) _vbox(), _vbox = null;
        watch(table, {
            find(text) {
                if ($scope.data.constructor === Table){
                    $scope.data.searchText = text;
                    $scope.data.update();
                }
            }
        })
        thead = null;
        fields.forEach(enrichField);
        remove(this.children);
        this.innerHTML = template;
        markedRows = false;
        this.style.display = 'block';
        var $scope = {
            fields,
            isEmpty,
            hasFoot: true,
            setContextMenu,
            tbody0: null,
            rowClick(d, i, event) {
                active(table, i, d, event.target);
            },
            tbody(e) {
                var e = list.apply(null, arguments);
                css(e, tbodyHeight(e, this.hasFoot));
                css(e, { width: this.adapter.offsetWidth, display: 'block' });
                this.tbody0 = e;
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
                this.data.sort(f);
            },
            setWidth(target, f) {
                css(target, { width: f.width });
            },
            a: button,
            setFixedColumn,
            pagination
        };
        render(this, $scope, this.$parentScopes.concat(this.$scope));
        $scope.data = Table.from(fields, await data);
        $scope.data.callback = function () {
            render.digest();
        };
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
            var clearCss = { left: '', right: '', borderLeft: '', borderRight: '' };
            if (append === appendChild.before) {
                srcTds.map(function (src, cx) {
                    var dst = dstTds[cx];
                    var d = dst[0] || dst.next;
                    if (d) src.map(function (s) {
                        css(s, clearCss);
                        append(d, s);
                    });
                    else if (d = dst.prev) src.map(function (s) {
                        css(s, clearCss);
                        appendChild.after(d, s);
                        d = s;
                    });
                })
            } else {
                srcTds.map(function (src, cx) {
                    var dst = dstTds[cx];
                    var d = dst[dst.length - 1] || dst.prev;
                    if (d) src.map(function (s) {
                        css(s, clearCss);
                        append(d, s);
                        d = s;
                    });
                    else if (d = dst.next) src.map(function (s) {
                        css(s, clearCss);
                        appendChild.before(d, s);
                    });
                });

            }
            markThead();
            markedRows = true;
            setLazyFixedColumn.call(table);
        }
    );
    resizingList.set(table, setFixedColumn);
    on("scroll")(table, setFixedColumn);
    return table;
}
