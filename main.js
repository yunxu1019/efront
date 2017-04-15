var load=require("./process/load");
load("./process/console");
var watch = require("./process/watch");
var compile_js = "./process/compile";
var child_process=require("child_process");
var server=require("./server/main");
watch(compile_js, function () {
    var compile = load("./process/compile.js");
});
console.info('你好!');