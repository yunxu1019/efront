var getfile=require("../process/getfile");
module.exports=function(req,res){
    var main=getfile("main.js");
    res.write(main);
    return res.end();
}
