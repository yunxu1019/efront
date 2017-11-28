/* 
 * 不枝雀
 * 2017-3-18 13:50:45
 */

if (!"".trim) String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/, "");
};
var isString = function isString(o) {
    return typeof o === "string";
}