/* 
 * 不枝雀
 * 2017-3-18 0:25:46
 */

var userAgent = navigator.userAgent;
var anniu = createElement("input");
if (!/Safari/.test(userAgent) || /Edge/.test(userAgent)) {
    anniu.type="button";
}