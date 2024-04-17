"use strict";
it("将数据生成图像", function () {
    var fs = require('fs');
    var path = require("path");
    var pngjs = require("../pngjs/parser-sync");
    var jspng=require("../pngjs/packer-sync");
    var data = fs.readFileSync(path.join(__dirname, "../data/cons/zimoli/home.png"));
    var png = pngjs(data, {});
    // var pngencode = fs.readFileSync(path.join(__dirname, "./pngencode.js")).toString();
    // var deflate = new Function(fs.readFileSync(path.join(__dirname,"./deflate.js")).toString()+";return deflate;")();
    // var crc=new Function(fs.readFileSync(path.join(__dirname,"./crc.js")).toString()+";return crc;")();
    // var pngencoder = new Function("deflate","crc", pngencode + ";return pngencode;").call(null, deflate,crc);
    console.log(png)
    var pngencoder=require("./pngencode");
    
    var data =Buffer.from(pngencoder(getalpha(png.data), png.width, png.height),"base64");
    // var data=jspng(png);
    fs.writeFileSync(path.join(__dirname,"../data/cons/zimoli/home_2.png"),data);
    return
});
function getalpha(data){
    var alpha=[];
    for(var cx=3,dx=data.length;cx<dx;cx+=4){
        alpha.push(data[cx]);
    }
    return alpha;
}
it.skip("table生成时要用到无符号右移?", function () {
    var table_1 = function () {
        var sign = -306674912;
        var c, table = new Array(256);
        for (var n = 0; n < 256; n++) {
            c = n;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            table[n] = c;
        }
        return table;
    }
    var table_0 = function () {
        var c, table = new Array(256);
        for (var n = 0; n < 256; n++) {
            var m = 8,
                c = n;
            while (m--)
                c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
            table[n] = c;
        }
    }
    var table_2 = function () {
        var sign = -306674912;
        var c, table = new Array(256);
        for (var n = 0; n < 256; n++) {
            c = n;
            c = c & 1 ? sign ^ c >> 1 : c >> 1;
            c = c & 1 ? sign ^ c >> 1 : c >> 1;
            c = c & 1 ? sign ^ c >> 1 : c >> 1;
            c = c & 1 ? sign ^ c >> 1 : c >> 1;
            c = c & 1 ? sign ^ c >> 1 : c >> 1;
            c = c & 1 ? sign ^ c >> 1 : c >> 1;
            c = c & 1 ? sign ^ c >> 1 : c >> 1;
            c = c & 1 ? sign ^ c >> 1 : c >> 1;
            table[n] = c;
        }
        return table;
    }
    var table_3 = function () {
        var c = 0,
            table = new Array(256);
        for (var n = 0; n != 256; ++n) {
            c = n;
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            table[n] = c;
        }
        return table;
    }
    var is_equal = function (table1, table2) {
        for (var cx = 0; cx < 256; cx++) {
            if (table1[cx] !== table2[cx]) {
                return false;
            }
        }
        return true;
    }
    var test = function (f, count) {
        var time = +new Date;
        while (count--) {
            f()
        }
        return new Date - time;
    }

    console.log(is_equal(table_1(), table_2()))
    console.log(is_equal(table_1(), table_3()))
    console.log(test(table_1, 100000), test(table_1, 100000), test(table_0, 100000))

})