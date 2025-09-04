import * as http from "http";
import * as ex from "./export_test.mjs";
import { b as B } from "./export_test.mjs";
import "./export_test.mjs?aaa";
import "./export_test.mjs?aaa";
import "./export_test.mjs?bbb";
import { A } from "./exportStar_test.mjs";
console.log(ex, A, 'import_test.mjs');
setTimeout(function () {
    console.log(ex, B, 'timeout 100 B');
    console.log(ex, A, 'timeout 100 A');
}, 100);
export var c = 'c';