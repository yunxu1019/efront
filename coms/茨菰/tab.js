var ensp = s => Array(s + 1).join(" "/*&ensp*/);
var getEnspBefore = function (node) {
    if (!node) return 0;
    while (node && (node.nodeType !== 1 || !/^br$/i.test(node.tagName))) {
        node = node.previousSibling;
    }
    if (node) {
        var next = node.nextSibling;
        if (next) {
            next = /^[\u2002\u0020\u00a0]+/.exec(next.nodeValue);
            if (next) return next[0].length;
        }
    }
};
return function (forcetab) {
    var selection = document.getSelection();
    var { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
    if (anchorNode !== focusNode || anchorOffset !== focusOffset) return;
    if (forcetab < 0) {
        var tempNode = anchorNode;
        var space = ensp(4);
        while (tempNode) {
            if (tempNode.nodeType === 1) {
                if (/^br$/i.test(tempNode.tagName)) return;
                tempNode = tempNode.lastChild || tempNode.previousSibling;
                continue;
            }
            if (tempNode.nodeValue.indexOf(space) >= 0) {
                tempNode.nodeValue = tempNode.nodeValue.replace(space, '');
                if (tempNode === anchorNode) {
                    anchorOffset -= 4;
                    if (anchorOffset < 0) anchorOffset = 0;
                    selection.setBaseAndExtent(tempNode, anchorOffset, tempNode, anchorOffset);
                }
                return;
            }
            if (/[\r\n\u2028\u2029]/.test(tempNode.nodeValue)) return;
            tempNode = tempNode.previousSibling || tempNode.parentNode?.previousSibling;
        }
        return;
    }
    if (anchorNode.nodeType === 1) {
        var child = anchorNode.childNodes[anchorOffset];
        var spaceSize = 4;
        if (child.nodeType === 1) spaceSize = getEnspBefore(child?.previousSibling?.previousSibling || anchorNode);
        if (!spaceSize && forcetab !== false) spaceSize = 4;
        if (!spaceSize) return;
        var space = document.createTextNode(ensp(spaceSize));
        anchorNode.insertBefore(space, child);
        selection.setBaseAndExtent(space, spaceSize, space, spaceSize);
    }
    else if (anchorNode.nodeType === 3) {
        if (forcetab === 0) return;
        var spaceSize = (4 - anchorOffset % 4);
        anchorNode.nodeValue = anchorNode.nodeValue.slice(0, anchorOffset) + ensp(spaceSize) + anchorNode.nodeValue.slice(anchorOffset);
        anchorOffset += spaceSize;
        selection.setBaseAndExtent(anchorNode, anchorOffset, anchorNode, anchorOffset);
    }
};
