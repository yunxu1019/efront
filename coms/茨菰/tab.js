var ensp = s => Array(s + 1).join(" "/*&ensp*/);
var getPrevEnsp = function (rowNode) {
    var prev = rowNode.previousSibling;
    var m;
    if (prev) {
        m = /^\u0020+/.exec(prev.innerText);
        if (m) m = m[0].length;
        else m = 0;
        var pl = prev.lastChild;
        if (pl && /^deep/i.test(pl.tagName) && /[\{\[\(]$/.test(pl.innerText)) m += 4;
    }
    else m = 0;
    var rf = rowNode.firstChild;
    if (rf && /^deep/i.test(rf.tagName) && /[\}\]\)]$/.test(rf.innerText)) {
        if (m > 4) m -= 4;
        else m = 0;
    }
    return [rowNode, rf, m];
}
var getEnspAt = function (node, offset) {
    if (!node) return 0;
    while (node.nodeType === 1) {
        var c = node.childNodes[offset];
        if (!c) {
            c = node.lastChild
        }
        if (!c) return [node, null, 0];
        node = c;
        if (node.nodeType === 3) {
            offset = node.nodeValue.length;
            break;
        }
    }
    if (node.nodeType === 3) {
        var t = node.nodeValue;
        var s = offset;
        while (t.charAt(s - 1) === " ") s--;
        var e = offset;
        while (t.charAt(e) === " ") e++;
        var parentNode = node.parentNode;
        var nextSibling = node.nextSibling;
        if (e < t.length) {
            var nextSibling1 = document.createTextNode(t.slice(e));
            parentNode.insertBefore(nextSibling1, nextSibling);
            nextSibling = nextSibling1;
        }
        if (s < t.length) {
            if (s === 0) remove(node);
            else node.nodeValue = t.slice(0, s);
        }
        return [parentNode, nextSibling, e - s];
    }
    return [node, null, 0];
};
var getFocusRows = function (elem, anchorNode, focusNode) {
    var s = getTargetIn(elem, focusNode, false);
    var e = getTargetIn(elem, anchorNode, false);
    if (s.i > e.i) [s, e] = [e, s];
    var rows = [];
    if (!s || !e) return rows;
    do {
        rows.push(s);
        s = s.nextSibling;
    } while (s && s !== e);
    rows.push(e);
    return rows;
};
var tabRowRight = function (row) {
    var e = document.createTextNode(ensp(4));
    row.insertBefore(e, row.firstChild);
};
var tabRowLeft = function (row) {
    var e = row.firstChild;
    var size = 4;
    while (e && size > 0) {
        if (e.nodeType !== 3) break;
        var nodeValue = e.nodeValue;
        var m = / {1,4}|\t/.exec(nodeValue);
        if (m) {
            if (m === '\t') size -= 4;
            else size -= m[0].length;
            nodeValue = nodeValue.slice(m[0].length);
        }
        if (!nodeValue.length) {
            var n = e.nextSibling;
            remove(e);
            e = n;
        }
        else {
            size = 0;
        }
    }
};
var tabSelection = function (elem, anchorNode, focusNode, forcetab) {
    var rows = getFocusRows(elem, anchorNode, focusNode);
    if (forcetab > 0) rows.forEach(tabRowRight);
    else if (forcetab < 0) rows.forEach(tabRowLeft);
};
return function (elem, forcetab) {
    if (!elem) return;
    var selection = document.getSelection();
    var { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
    if (anchorNode !== focusNode || anchorOffset !== focusOffset) return tabSelection(elem, anchorNode, focusNode, forcetab);
    var rowNode = getTargetIn(elem, anchorNode, false);
    var [parentNode, child, spaceSize] = getEnspAt(anchorNode, anchorOffset);
    if (forcetab < 0) {
        if (spaceSize > 4) {
            if (spaceSize % 4 > 0) {
                spaceSize -= spaceSize % 4;
            }
            else spaceSize -= 4;
        }
        else spaceSize = 0;
        if (spaceSize > 0) {
            space = document.createTextNode(ensp(spaceSize));
            parentNode.insertBefore(space, child);
            selection.setBaseAndExtent(space, spaceSize, space, spaceSize);
            return;
        }
        tabRowLeft(rowNode);
        return;
    }
    if (forcetab > 0) {
        if (!spaceSize) {
            if (!child) {
                [parentNode, child, spaceSize] = getPrevEnsp(rowNode);
            }
        }
        else if (!anchorOffset && !spaceSize || anchorOffset >= spaceSize) {
            spaceSize += 4 - spaceSize % 4;
        }
        if (!spaceSize) return;

        var space = document.createTextNode(ensp(spaceSize));
        parentNode.insertBefore(space, child);
        selection.setBaseAndExtent(space, spaceSize, space, spaceSize);
        return;
    }
    if (forcetab === false) {
        if (!rowNode.innerText) remove(rowNode.childNodes);
        [parentNode, child, spaceSize] = getPrevEnsp(rowNode);
        if (!spaceSize) return;
        var space = document.createTextNode(ensp(spaceSize));
        parentNode.insertBefore(space, child);
        selection.setBaseAndExtent(space, spaceSize, space, spaceSize);
    }
};
