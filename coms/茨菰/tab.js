var ensp = s => Array(s + 1).join("\u2002"/*&ensp*/);
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
    var { anchorNode, anchorOffset } = selection;
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
        anchorNode.nodeValue = anchorNode.nodeValue.slice(0, anchorOffset) + ensp(4) + anchorNode.nodeValue.slice(anchorOffset);
        anchorOffset += 4;
        selection.setBaseAndExtent(anchorNode, anchorOffset, anchorNode, anchorOffset);
    }
};
