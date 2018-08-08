var tableContainer = createElement("table");

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

var tdElementReg = /^t[hd]$/i;
var trElementReg = /^tr$/i;

function table(rowsGenerator) {
    var tableElement = createElement(tableContainer);
    var table = list(tableElement);
    table.innerHTML = `<thead><tr><td colspan=2><span>1</span></td><td rowspan=2><span>th1</span></td><td>th3</td><td>th4</td></tr><tr><td>th3</td><td>th4</td></tr></thead><tbody><tr><td rowspan=2>td1</td><td>td2</td><td>td3</td><td>td4</td></tr><tr><td rowspan=2>td1</td><td>td2</td></tr></tbody>`;
    var [thead, tbody] = table.children;
    autodragchildren(
        thead,
        function (element) {
            if (!tdElementReg.test(element.tagName)) return false;
            var savedRowDeltas = [];
            [].map.call(thead.children, function (tr) {
                markRowTds(tr, savedRowDeltas);
            });
            var { colstart, colend } = element;
            return getTdsByCol(table, colstart, colend);
        },
        function (src, dst, rel, append, parentNode) {
            var children = parentNode.children;
            var srcElement = children[src];
            var dstElement = children[rel];
            var dstTds = getRowsOfTdsByCol(table, dstElement.colstart, dstElement.colend);
            var srcTds = getRowsOfTdsByCol(table, srcElement.colstart, srcElement.colend);
            console.log(srcTds, dstTds);
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
    onmousedown(table, function () {
        var offmousemove = onmousemove(window, copyStyle);
        var offmouseup = onmouseup(window, function () {
            offmousemove();
            offmouseup();
        });
    });
    return table;
}
table.tr = tr;
table.td = td;