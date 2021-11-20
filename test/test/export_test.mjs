var a = 1;
export var b;
setTimeout(function () {
    console.log(c);
    b = a;
}, 10);
setTimeout(function () {
    console.log(b);
}, 200);
export {D as A}
import { c } from "./import_test.mjs";