var cursor = document.createElement("span");
var getCursorPosition = function () {
    var selection = document.getSelection();
    var { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
    if (!focusNode) return;
    var position;
    if (focusNode.nodeType === 1) {
        focusNode.insertBefore(cursor, focusNode.childNodes[focusOffset]);
        position = getScreenPosition(cursor);
    }
    else if (focusNode.nodeType === 3) {
        var nodeValue = focusNode.nodeValue;
        focusNode.nodeValue = nodeValue.slice(0, focusOffset);
        focusNode.parentNode.insertBefore(cursor, focusNode.nextSibling);
        position = getScreenPosition(cursor);
        cursor.parentNode.removeChild(cursor);
        focusNode.nodeValue = nodeValue;
    }
    selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)
    return position;
};