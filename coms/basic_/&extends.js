var __static = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
    d.__proto__ = b;
} || extend;
var setConstructor = Object.defineProperty ? function (a, c) {
    try {
        Object.defineProperty(a, "constructor", { value: c });
    } catch (e) {
        setConstructor = function (a, c) {
            a.constructor = c;
        };
        setConstructor(a, c);
    }
} : function (a, c) {
    a.constructor = c;
};
// class A extends B {}
function extends_(A, B) {
    A.prototype = B === null ? Object.create(null) : (_ = new B, setConstructor(_, A), _);
    __static(A, B);
    var _;
}
return extends_;