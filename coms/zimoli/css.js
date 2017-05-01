/* 
 * 不枝雀
 * 2017-5-1 18:33:41
 */

var style = document.body.style;
var css = function (targetNode, oStyle) {
    var targetStyle = targetNode.style;
    for (var k in oStyle) {
        if (k in targetStyle) {
            try {
                targetStyle[k] = oStyle[k];
            } catch (e) {
            }
        }
    }
};
