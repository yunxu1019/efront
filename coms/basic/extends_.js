var __static = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
    d.__proto__ = b;
} || extend;
var setConstructor = Object.defineProperty ? function (a, c) {
    Object.defineProperty(a, "constructor", { value: c });
} : function (a, c) {
    a.constructor = c;
};
// class A extends B {}
function extends_(A, B) {
    __static(A, B);
    A.prototype = B === null ? Object.create(null) : new (_ = function () { setConstructor(this, A) }, _.prototype = B.prototype, _);
}