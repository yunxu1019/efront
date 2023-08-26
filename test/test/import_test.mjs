import * as http from "http";
import * as ex from "./export_test.mjs";
import { b as B } from "./export_test.mjs";
import "./export_test.mjs?aaa";
import "./export_test.mjs?aaa";
import "./export_test.mjs?bbb";
import { A } from "./exportStar_test.mjs";
console.log(ex, A);
setTimeout(function () {
    console.log(ex, B);
    console.log(ex, A);
}, 100);
export var c = 'c';