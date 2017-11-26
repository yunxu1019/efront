"use strict";
var temp=0;
var map={};
var fs=require("fs");
fs.readFileSync("./data/gbk-unicode-utf8-cn.txt").toString().split(/[\r\n]+/g).forEach(function(element) {
    map[parseInt(element.slice(0,4),16)]=element[element.length-1];
});

module.exports=function gbk2utf8(buff) {
    var res=[];
    for(var cx=0,dx=buff.length;cx<dx;cx++){
        var buf=buff[cx];
        if(temp){
            res.push(map[(temp<<8)+buf]);
            temp=0;
        }else if(buf>0x7f){
            temp=buf;
        }else{
            res.push(String.fromCharCode(buf));
        }
    }
    return res.join("");
}