/* 
 * 不枝雀
 * 2017-5-1 18:33:41
 */

var css = function (targetNode, oStyle, oValue) {
    if (!isNode(targetNode)) return;
    var stylesheet = [];
    // var styleobject = parseKV(targetStyle.cssText);

    if (typeof oStyle === "string") {
        if (typeof oValue === "string") {
            stylesheet.push(oStyle + ":" + oValue)
        } else {
            stylesheet.push(oStyle);
        }
    } else if (oStyle instanceof Object) {
        for (var k in oStyle) {
            targetNode.style[k.replace(/\w\-+(\w)/g, function (m, w) {
                return w.toUpperCase();
            })] = oStyle[k];
            // stylesheet.push(k.replace(/[A-Z]/g, function (m) {
            //     return "-" + m.toLowerCase()
            // }) + ":" + oStyle[k]);
        }
    }
    if (stylesheet.length)
        try {
            var targetStyle = targetNode.style;
            targetStyle.cssText += ";" + stylesheet.join(";");
        } catch (e) {}
};