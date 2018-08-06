var cloneProperties = "font,color,textShadow,opacity,writingMode,blockSize,wordSpacing,letterSpacing,whiteSpace".split(",");
var cloneProperties2 = "font,color,borderRadius,borderWidth,borderColor,borderStyle,verticalAlign,textAlign,textShadow,background,opacity,padding,boxShadow,overflow,position,writingMode,blockSize,wordSpacing,letterSpacing,textIndent,lineHeight,display".split(",");
var copyStyle = function (srcStyle, dstStyle, cloneProperties = cloneProperties2) {
    for (var cx = 0, dx = cloneProperties.length; cx < dx; cx++) {
        var k = cloneProperties[cx];
        if (k in dstStyle) {
            if ((dstStyle[k] || srcStyle[k]) && dstStyle[k] !== srcStyle[k]) {
                dstStyle[k] = srcStyle[k] || "";
            }
        }
    }
};
var cloneVisible = function (td) {
    var result = document.createElement("clone");
    var _left, _top, _right, _bottom;
    var span = document.createElement("x");
    var clone = function (td) {
        if (td.nodeType === 3) {
            var copy = span.cloneNode();
            copy.appendChild(td.cloneNode());
            var parentNode = td.parentNode;
            parentNode.removeChild(td);
            parentNode.appendChild(copy);
            var { left, top, width, height } = getScreenPosition(copy);
            var style = getComputedStyle(copy);
            copyStyle(style, copy.style, cloneProperties);
            copy.style.lineHeight = height + "px";
            parentNode.removeChild(copy);
            parentNode.appendChild(td);
            result.appendChild(copy);
        } else if (td.nodeType !== 1) return;
        else {
            var style = getComputedStyle(td);
            if (/(?:hidden)/.test(style.overflow)) {
                var copy = cloneCell(td);
                result.appendChild(copy);
            } else {
                var copy = document.createElement(td.tagName);
                copyStyle(style, copy.style);
                result.appendChild(copy);
                [].slice.call(td.childNodes, 0).map(clone);
            }
            var { left, top, width, height } = getScreenPosition(td);
        }
        var right = left + width;
        var bottom = top + height;
        copy.tempstyle = {
            left,
            top,
            width,
            height
        };
        console.log(copy)

        if (_left === undefined || _left > left) _left = left;
        if (_top === undefined || _top > top) _top = top;
        if (_right === undefined || _right < right) _right = right;
        if (_bottom === undefined || _bottom < bottom) _bottom = bottom;
    };
    clone(td);
    extend(result.style, {
        position: "absolute",
        left: _left + "px",
        top: _top + "px",
        width: _right - _left + "px",
        height: _bottom - _top + "px"
    });
    [].map.call(result.children, function (element) {
        var { left, top, width, height } = element.tempstyle;
        extend(element.style, {
            position: "absolute",
            display: "block",
            margin: 0,
            boxSizing: "border-box",
            left: (left - _left) + "px",
            top: (top - _top) + "px",
            width: width + "px",
            height: height + "px"
        });
        if (element.tagName === "x") console.log(element);
    });
    console.log(result.childNodes)
    return result;
};

function cloneCell(node, parentPosition) {
    if (!node || node.nodeType > 3 || node.nodeType == 2) return;
    var style = node.style;
    if (!style) return node.cloneNode();
    style = getComputedStyle(node);
    if (style.display === "none") return;
    if (style.visibility === "hidden" || style.visibility === "collapse") return;
    if (+style.opacity === 0) return;
    if (style.position === "fixed") return;
    if (style.overflow === "hidden") {
        if (node.offsetHeight === 0 || node.offsetWidth === 0) return;
    }
    var clone = createElement(node.tagName);
    var children = node.childNodes;
    var cloneStyle = clone.style;
    copyStyle(style, cloneStyle);
    var screenPosition = getScreenPosition(node);
    clone.value = node.value;
    if (parentPosition && cloneStyle.position === "absolute") {
        cloneStyle.left = (screenPosition.left - parentPosition.left) + "px";
        cloneStyle.top = (screenPosition.top - parentPosition.top) + "px";
    } else {
        cloneStyle.margin = style.margin;
        cloneStyle.left = style.left;
        cloneStyle.top = style.top;
    }
    cloneStyle.width = screenPosition.width + "px";
    cloneStyle.height = screenPosition.height + "px";
    cloneStyle.boxSizing = "border-box";
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        var child = children[cx];
        var childClone = cloneCell(child, screenPosition);
        if (childClone) clone.appendChild(childClone);
    }
    return clone;
}
cloneVisible.cell = cloneCell;