/* 
 * 不枝雀
 * 2017-3-18 13:50:45
 */

module.exports = function isString(o) {
    return typeof o === "string" || o instanceof String;
}