var start_time = 0;
var fs = require("fs");
var watch_tree={};
function watch(file, then) {
    watch_tree[file]&&watch_tree[file].forEach(function(unwatch){
        unwatch();
    });
    if(!(then instanceof Function)){
        delete watch_tree[file];
        return;
    };
    var timmer = 0;
    var index=file.lastIndexOf("\\")+1||file.lastIndexOf("\/")+1;
    var folder=file.slice(0,index);
    var files = require("child_process").spawnSync(`dir /b ${file.replace(/\//g,"\\")}*`, {
        shell: true
    }).output[1];
    var watchers = String(files).trim().split(/[\r\n]+/).map(function (f) {
        var file=folder+f;
        fs.watch(file, function () {
            clearTimeout(timmer);
            timmer = setTimeout(function () {
                try {
                    then()
                } catch (e) {
                    console.error("执行失败！");
                }
            }, 80);
        })
        return function () {
            return fs.unwatch(file);
        };
    });
    watch_tree[file]=watchers;
}
module.exports = watch;