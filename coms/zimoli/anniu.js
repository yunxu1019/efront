/* 
 * 不枝雀
 * 2017-3-18 0:25:46
 */

var userAgent = navigator.userAgent;
var anu = createElement("input");
if (!/Safari/.test(userAgent) || /Edge/.test(userAgent)) {
    anu.type = "button";
}
css(anu,"position:absolute;left:0;right:0;top:0;bottom:0;width:100%;height:100%;cursor:default;box-sizing:border-box;border:none;");
opacity(anu,0);
function anniu() {
    return anu.cloneNode();
}