/* 
 * 不枝雀
 * 2017-5-1 18:33:41
 */

var css = function (targetNode, oStyle, oValue) {
    var stylesheet = [];
    if (typeof oStyle==="string") {
        if (typeof oValue==="string") {
            stylesheet.push(oStyle + ":" + oValue)
        } else {
            stylesheet.push(oStyle);
        }
    } else if (oStyle instanceof Object) {

        for (var k in oStyle) {
            stylesheet.push(k.replace(/[A-Z]/g,function(m){return "-"+m.toLowerCase()}) + ":" + oStyle[k]);
        }
    }
    try {

        targetNode.style.cssText=stylesheet.join(";");
    } catch (e) {
    }

};