import * as http from "http";
import * as ex from "./export_test.mjs";
import { b as A } from "./export_test.mjs";
import { b } from "./exportStar_test.mjs";
console.log(ex, b);
setTimeout(function () {
    console.log(ex, b);
    b = 3;
    console.log(ex, b);
}, 100);
export var c = 'c';