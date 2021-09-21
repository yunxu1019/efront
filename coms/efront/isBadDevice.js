"use strict";
// 检查性能
var isBadDevice;

let saved_time = new Date;
let inc = 0;
try {
    let test = function () {
        inc++;
        document.createElement("div");
        test();
    };
    test();
} catch (e) {
}
var SAFE_CIRCLE_DEPTH = inc / (new Date - saved_time) | 0;
isBadDevice = SAFE_CIRCLE_DEPTH < 512;
