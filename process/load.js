var fs=require("fs");
var path=require("path");
var loader=function(f){
    var file=fs.readFileSync(f+".js");
    var filepath=path.parse(f);
    return new Function("require","module","exports","process","global","__dirname",String(file)+";return "+f.name)
    (require,module,exports,process,global,filepath.dir);
}
module.exports=loader;