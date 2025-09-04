var a = 1;
export var b = 1;
setTimeout(function () {
    console.log(c, 'timeout 10');
    b = a;
}, 10);
setTimeout(function () {
    console.log(b, 'timeout 200');
}, 200);
export { a as A }
console.log(import.meta.url, b);
var c;
// import { c } from "./import_test.mjs";
export { c as C } from "./import_test.mjs";