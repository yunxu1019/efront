/* 
 * 不枝雀
 * 2017-4-5 22:38:04
 */


var http=require("http");
var server=http.createServer(function(){
    
});
server.listen(80,function(e){
    console.log(e);
});
server.on("error",function(){
    console.log("server is already running!");
});
server.on("listening",function(){
    console.log("server start success!");
});