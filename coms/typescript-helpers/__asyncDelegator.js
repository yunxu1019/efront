/**
 * typescript:asyncDelegator
 * 这个文件由工具生成，请不要手动修改
 * 
 * Efront Authors
 * 2023-03-31T13:49:30.678Z
 */
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};