var a = 1;
export var b = 1;
setTimeout(function () {
    console.log(c);
    b = a;
}, 10);
setTimeout(function () {
    console.log(b);
}, 200);
export { a as A }
import { c } from "./import_test.mjs";