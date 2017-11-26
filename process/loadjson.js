"use strict";
var fs=require("fs");
module.exports=function loadjson(url) {
    var data = fs.readFileSync(url);
    return new Function("return " + String(data))();
}
