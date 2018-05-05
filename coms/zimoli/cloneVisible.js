var cloneProperties = "font,color,display,borderRadius,border,verticalAlign,textAlign,textShadow,background,opacity,padding,boxSizing,boxShadow,overflow,height,width,position,writingMode,blockSize,wordSpacing,letterSpacing,textIndent".split(",");
function cloneVisible(node, parentPosition) {
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
    for (var cx = 0, dx = cloneProperties.length; cx < dx; cx++) {
        var k = cloneProperties[cx];
        if (k in cloneStyle) {
            cloneStyle[k] = style[k];
        }
    }
    var screenPosition = getScreenPosition(node);
    clone.value = node.value;
    if (parentPosition && cloneStyle.position === "absolute") {
        cloneStyle.left = (screenPosition.left - parentPosition.left) + "px";
        cloneStyle.top = (screenPosition.top - parentPosition.top) + "px";
    }
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        var child = children[cx];
        var childClone = cloneVisible(child, screenPosition);
        if (childClone) clone.appendChild(childClone);
    }
    if (clone.style.lineHeight !== "normal")
        console.log(clone.style.font);
    return clone;
}