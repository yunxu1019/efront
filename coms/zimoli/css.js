/* 
 * 不枝雀
 * 2017-5-1 18:33:41
 */
var stylesheet_Map = {};
var css = function (targetNode, oStyle, oValue) {
    if (!isNode(targetNode) && !isString(targetNode)) return;
    var stylesheet = [];
    // var styleobject = parseKV(targetStyle.cssText);

    if (typeof oStyle === "string") {
        if (typeof oValue === "string") {
            stylesheet.push(oStyle + ":" + oValue)
        } else {
            stylesheet.push(oStyle);
        }
    } else if (oStyle instanceof Object) {
        if (isNode(targetNode)) {
            for (var k in oStyle) {
                targetNode.style[k.replace(/\w\-+(\w)/g, function (m, w) {
                    return w.toUpperCase();
                })] = oStyle[k];
            }
        } else {
            for (var k in oStyle) {
                stylesheet.push(k.replace(/[A-Z]/g, function (m) {
                    return "-" + m.toLowerCase()
                }) + ":" + oStyle[k]);
            }
        }
    }
    if (stylesheet.length)
        try {
            if (isNode(targetNode)) {
                var targetStyle = targetNode.style;
                targetStyle.cssText += ";" + stylesheet.join(";");
            } else {
                var style = createElement("style");
                style.type = "text/css";
                var innerCss = `${targetNode}{${stylesheet.join(";")}}`;
                if (style.styleSheet) {
                    style.styleSheet.cssText = innerCss;
                } else {
                    style.innerHTML = innerCss;
                }
                appendChild(document.getElementsByTagName("head")[0], style);
            }
        } catch (e) { }
};